import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Decimal } from '@prisma/client/runtime/client';

import { ChiTietNhapKhoCreateManyInput } from '@/generated/prisma/models/ChiTietNhapKho';
import { TrangThaiNhap } from '@/generated/prisma/enums';
import { PrismaService } from '../shared/prisma';

@Injectable()
export class ReceiptsService {
  constructor(private readonly prisma: PrismaService) {}

  private generateSoPhieu(): string {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const t = now.getTime().toString().slice(-6);
    return `PNK-${y}${m}${d}-${t}`;
  }

  async createReceipt(dto: {
    khoId: string;
    ghiChu?: string;
    items: Array<{
      sanPhamId: string;
      soLuong: string;
      donGia?: string;
      soLo?: string;
      hanSuDung?: string;
      soSerial?: string;
    }>;
  }) {
    if (!dto.items?.length)
      throw new BadRequestException('Danh sách hàng nhập rỗng');

    return this.prisma.$transaction(async (tx) => {
      const soPhieu = this.generateSoPhieu();
      const header = await tx.phieuNhapKho.create({
        data: {
          soPhieu,
          khoId: dto.khoId,
          ghiChu: dto.ghiChu,
          // Default value is DRAFT, we don't need to set it
          // trangThai: Prisma.TrangThaiNhapEnum.DRAFT,
        },
      });

      const chiTietData: ChiTietNhapKhoCreateManyInput[] = dto.items.map(
        (i) => ({
          phieuId: header.id,
          sanPhamId: i.sanPhamId,
          soLuong: new Decimal(i.soLuong),
          donGia: i.donGia ? new Decimal(i.donGia) : undefined,
          soLo: i.soLo,
          hanSuDung: i.hanSuDung ? new Date(i.hanSuDung) : undefined,
          soSerial: i.soSerial,
        }),
      );

      await tx.chiTietNhapKho.createMany({ data: chiTietData });

      return tx.phieuNhapKho.findUnique({
        where: { id: header.id },
        include: { chiTiet: true, kho: true },
      });
    });
  }

  async findAll() {
    return this.prisma.phieuNhapKho.findMany({
      where: { isDelete: false },
      include: { kho: true, chiTiet: { include: { sanPham: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getReceiptById(id: string) {
    const found = await this.prisma.phieuNhapKho.findUnique({
      where: { id },
      include: { chiTiet: { include: { sanPham: true } }, kho: true },
    });
    if (!found) throw new NotFoundException('Không tìm thấy phiếu nhập');
    return found;
  }

  async validateReceipt(id: string) {
    return this.prisma.$transaction(async (tx) => {
      const header = await tx.phieuNhapKho.findUnique({
        where: { id },
        include: { chiTiet: true },
      });
      if (!header) throw new NotFoundException('Không tìm thấy phiếu nhập');
      if (header.trangThai === TrangThaiNhap.DONE) return header;

      for (const row of header.chiTiet) {
        const existing = await tx.tonKho.findFirst({
          where: {
            khoId: header.khoId,
            viTriKhoId: null,
            sanPhamId: row.sanPhamId,
            soLo: row.soLo ?? null,
            soSerial: row.soSerial ?? null,
          },
          select: { id: true },
        });

        if (existing) {
          await tx.tonKho.update({
            where: { id: existing.id },
            data: { soLuong: { increment: row.soLuong } },
          });
        } else {
          await tx.tonKho.create({
            data: {
              khoId: header.khoId,
              viTriKhoId: null,
              sanPhamId: row.sanPhamId,
              soLo: row.soLo ?? null,
              hanSuDung: row.hanSuDung ?? null,
              soSerial: row.soSerial ?? null,
              soLuong: row.soLuong,
            },
          });
        }
      }

      return tx.phieuNhapKho.update({
        where: { id },
        data: { trangThai: TrangThaiNhap.DONE },
        include: { chiTiet: true },
      });
    });
  }
}
