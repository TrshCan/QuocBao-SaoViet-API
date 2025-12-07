import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma';

@Injectable()
export class UnitsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: { ten: string; moTa?: string }) {
    return this.prisma.donViTinh.create({
      data: {
        ten: dto.ten,
        moTa: dto.moTa,
      },
    });
  }

  async findAll() {
    return this.prisma.donViTinh.findMany({
      where: { isDelete: false },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const found = await this.prisma.donViTinh.findFirst({
      where: { id, isDelete: false },
    });
    if (!found) throw new NotFoundException('Không tìm thấy đơn vị tính');
    return found;
  }
}
