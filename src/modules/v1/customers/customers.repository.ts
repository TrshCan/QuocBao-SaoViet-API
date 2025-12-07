import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/modules/shared/prisma';

import type { Prisma, KhachHang } from '@/generated/prisma/client';
import type { DefaultArgs } from '@prisma/client/runtime/client';

type CustomerSelect = Prisma.KhachHangSelect<DefaultArgs> | undefined;

@Injectable()
export class CustomersRepository {
  constructor(private prisma: PrismaService) {}

  async findMany(query: Prisma.KhachHangFindManyArgs) {
    const { take: limit, skip: offset, where, orderBy, ...rest } = query;
    return this.prisma.khachHang.findMany({
      take: limit,
      skip: offset,
      where,
      orderBy,
      ...rest,
    });
  }

  async count(where: Prisma.KhachHangWhereInput) {
    return this.prisma.khachHang.count({ where });
  }

  async findOneById<T extends CustomerSelect>(
    id: string,
    options?: {
      select?: T;
    },
  ): Promise<KhachHang | null> {
    return this.prisma.khachHang.findUnique({
      where: { id },
      ...options,
    });
  }

  async findOneByCode<T extends CustomerSelect>(
    code: string,
    options?: {
      select?: T;
    },
  ): Promise<KhachHang | null> {
    return this.prisma.khachHang.findFirst({
      where: { code },
      ...options,
    });
  }

  async createOne<T extends CustomerSelect>(
    data: Prisma.KhachHangCreateInput,
    options?: {
      select?: T;
    },
  ): Promise<KhachHang> {
    return this.prisma.khachHang.create({
      data,
      ...options,
    });
  }

  async updateOneById<T extends CustomerSelect>(
    id: string,
    data: Prisma.KhachHangUpdateInput,
    options?: {
      select?: T;
    },
  ): Promise<KhachHang | null> {
    return this.prisma.khachHang.update({
      where: { id },
      data,
      ...options,
    });
  }

  async softDeleteById(id: string): Promise<KhachHang> {
    return this.prisma.khachHang.update({
      where: { id },
      data: { isDelete: true },
    });
  }

  async restoreById(id: string): Promise<KhachHang> {
    return this.prisma.khachHang.update({
      where: { id },
      data: { isDelete: false },
    });
  }

  async fulltextSearch(
    query: Prisma.KhachHangFindManyArgs,
    searchText: string,
  ) {
    const { take: limit, skip: offset, where, orderBy, ...rest } = query;

    const searchCondition: Prisma.KhachHangWhereInput = searchText
      ? {
          OR: [
            { ten: { contains: searchText, mode: 'insensitive' } },
            { code: { contains: searchText, mode: 'insensitive' } },
            { soDienThoai: { contains: searchText, mode: 'insensitive' } },
            { soDienThoai2: { contains: searchText, mode: 'insensitive' } },
            { email: { contains: searchText, mode: 'insensitive' } },
            { diaChi: { contains: searchText, mode: 'insensitive' } },
            { tenCongTy: { contains: searchText, mode: 'insensitive' } },
          ],
        }
      : {};

    return this.prisma.khachHang.findMany({
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
