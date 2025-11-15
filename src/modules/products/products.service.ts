import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../shared/prisma';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: {
    maSanPham: string;
    tenSanPham: string;
    nhom?: string;
    moTa?: string;
    donViTinhId: string;
    quanLyLo?: boolean;
    quanLyHSD?: boolean;
    quanLySerial?: boolean;
  }) {
    return this.prisma.sanPham.create({
      data: {
        maSanPham: dto.maSanPham,
        tenSanPham: dto.tenSanPham,
        nhom: dto.nhom,
        moTa: dto.moTa,
        donViTinhId: dto.donViTinhId,
        quanLyLo: dto.quanLyLo ?? false,
        quanLyHSD: dto.quanLyHSD ?? false,
        quanLySerial: dto.quanLySerial ?? false,
      },
      include: { donViTinh: true },
    });
  }

  async findAll() {
    return this.prisma.sanPham.findMany({
      where: { isDelete: false },
      include: { donViTinh: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const found = await this.prisma.sanPham.findFirst({
      where: { id, isDelete: false },
      include: { donViTinh: true },
    });
    if (!found) throw new NotFoundException('Không tìm thấy sản phẩm');
    return found;
  }
}
