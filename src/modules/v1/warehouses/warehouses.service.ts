import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/modules/shared/prisma';
import { Decimal } from '@prisma/client/runtime/client';

@Injectable()
export class WarehousesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: {
    maKho: string;
    tenKho: string;
    diaChi?: string;
    dienTich?: string;
  }) {
    return this.prisma.kho.create({
      data: {
        maKho: dto.maKho,
        tenKho: dto.tenKho,
        diaChi: dto.diaChi,
        dienTich:
          dto.dienTich && !isNaN(Number(dto.dienTich))
            ? new Decimal(dto.dienTich)
            : undefined,
      },
    });
  }

  async findAll() {
    return this.prisma.kho.findMany({
      where: { isDelete: false },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const found = await this.prisma.kho.findFirst({
      where: { id, isDelete: false },
    });
    if (!found) throw new NotFoundException('Không tìm thấy kho');
    return found;
  }
}
