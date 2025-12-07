import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/modules/shared/prisma';

import type { Prisma, NhaCungCap } from '@/generated/prisma/client';
import type { DefaultArgs } from '@prisma/client/runtime/client';

type SupplierSelect = Prisma.NhaCungCapSelect<DefaultArgs> | undefined;

@Injectable()
export class SuppliersRepository {
  constructor(private prisma: PrismaService) {}

  async findMany(query: Prisma.NhaCungCapFindManyArgs) {
    const { take: limit, skip: offset, where, orderBy, ...rest } = query;
    return this.prisma.nhaCungCap.findMany({
      take: limit,
      skip: offset,
      where,
      orderBy,
      ...rest,
    });
  }

  async count(where: Prisma.NhaCungCapWhereInput) {
    return this.prisma.nhaCungCap.count({ where });
  }

  async findOneById<T extends SupplierSelect>(
    id: string,
    options?: {
      select?: T;
    },
  ): Promise<NhaCungCap | null> {
    return this.prisma.nhaCungCap.findUnique({
      where: { id },
      ...options,
    });
  }

  async createOne<T extends SupplierSelect>(
    data: Prisma.NhaCungCapCreateInput,
    options?: {
      select?: T;
    },
  ): Promise<NhaCungCap> {
    return this.prisma.nhaCungCap.create({
      data,
      ...options,
    });
  }

  async updateOneById<T extends SupplierSelect>(
    id: string,
    data: Prisma.NhaCungCapUpdateInput,
    options?: {
      select?: T;
    },
  ): Promise<NhaCungCap | null> {
    return this.prisma.nhaCungCap.update({
      where: { id },
      data,
      ...options,
    });
  }

  async softDeleteById(id: string): Promise<NhaCungCap> {
    return this.prisma.nhaCungCap.update({
      where: { id },
      data: { isDelete: true },
    });
  }

  async restoreById(id: string): Promise<NhaCungCap> {
    return this.prisma.nhaCungCap.update({
      where: { id },
      data: { isDelete: false },
    });
  }

  async fulltextSearch(
    query: Prisma.NhaCungCapFindManyArgs,
    searchText: string,
  ) {
    const { take: limit, skip: offset, where, orderBy, ...rest } = query;

    const searchCondition: Prisma.NhaCungCapWhereInput = searchText
      ? {
          OR: [
            { tenNhaCungCap: { contains: searchText, mode: 'insensitive' } },
            { diaChi: { contains: searchText, mode: 'insensitive' } },
            { nguoiLienHe: { contains: searchText, mode: 'insensitive' } },
            { soDienThoai: { contains: searchText, mode: 'insensitive' } },
          ],
        }
      : {};

    return this.prisma.nhaCungCap.findMany({
      take: limit,
      skip: offset,
      where: {
        ...where,
        ...searchCondition,
      },
      orderBy,
      ...rest,
    });
  }
}
