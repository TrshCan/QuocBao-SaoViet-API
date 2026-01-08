import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/modules/shared/prisma';

import type { Prisma, DanhMuc } from '@/generated/prisma/client';
import type { DefaultArgs } from '@prisma/client/runtime/client';

type CategorySelect = Prisma.DanhMucSelect<DefaultArgs> | undefined;

@Injectable()
export class CategoriesRepository {
    constructor(private prisma: PrismaService) { }

    async findMany(query: Prisma.DanhMucFindManyArgs) {
        const { take: limit, skip: offset, where, orderBy, ...rest } = query;
        return this.prisma.danhMuc.findMany({
            take: limit,
            skip: offset,
            where,
            orderBy,
            ...rest,
        });
    }

    async count(where: Prisma.DanhMucWhereInput) {
        return this.prisma.danhMuc.count({ where });
    }

    async findOneById<T extends CategorySelect>(
        id: string,
        options?: {
            select?: T;
            include?: Prisma.DanhMucInclude;
        },
    ): Promise<DanhMuc | null> {
        return this.prisma.danhMuc.findUnique({
            where: { id },
            ...options,
        });
    }

    async findOneByCode<T extends CategorySelect>(
        maDanhMuc: string,
        options?: {
            select?: T;
        },
    ): Promise<DanhMuc | null> {
        return this.prisma.danhMuc.findFirst({
            where: { maDanhMuc },
            ...options,
        });
    }

    async createOne<T extends CategorySelect>(
        data: Prisma.DanhMucCreateInput,
        options?: {
            select?: T;
        },
    ): Promise<DanhMuc> {
        return this.prisma.danhMuc.create({
            data,
            ...options,
        });
    }

    async updateOneById<T extends CategorySelect>(
        id: string,
        data: Prisma.DanhMucUpdateInput,
        options?: {
            select?: T;
        },
    ): Promise<DanhMuc | null> {
        return this.prisma.danhMuc.update({
            where: { id },
            data,
            ...options,
        });
    }

    async softDeleteById(id: string): Promise<DanhMuc> {
        return this.prisma.danhMuc.update({
            where: { id },
            data: { isDelete: true },
        });
    }

    async restoreById(id: string): Promise<DanhMuc> {
        return this.prisma.danhMuc.update({
            where: { id },
            data: { isDelete: false },
        });
    }
}
