import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class WarehousesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: { maKho: string; tenKho: string; diaChi?: string; dienTich?: string }) {
    return this.prisma.kho.create({
      data: {
        maKho: dto.maKho,
        tenKho: dto.tenKho,
        diaChi: dto.diaChi,
        dienTich: dto.dienTich ? new Prisma.Decimal(dto.dienTich) : undefined,
      },
    });
  }

  async findAll() {
    return this.prisma.kho.findMany({
      where: { isDelete: false },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const found = await this.prisma.kho.findFirst({
      where: { id, isDelete: false },
    });
    if (!found) throw new NotFoundException('Không tìm thấy kho');
    return found;
  }
}

