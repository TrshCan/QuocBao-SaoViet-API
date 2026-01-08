import {
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
    ConflictException,
} from '@nestjs/common';

import { CategoriesRepository } from './categories.repository';
import { toErrorMessage } from '@/utils';
import { buildPagination } from '@/utils/format-pagination';

import type { PaginatedResponse } from '@/types/pagination';
import type { Prisma, DanhMuc } from '@/generated/prisma/client';
import type {
    CreateCategoryDto,
    FindAllCategoriesDto,
    UpdateCategoryDto,
} from './dto';

@Injectable()
export class CategoriesService {
    private readonly logger = new Logger(CategoriesService.name);

    constructor(private categoriesRepository: CategoriesRepository) { }

    async findAll(
        query: FindAllCategoriesDto,
    ): Promise<PaginatedResponse<DanhMuc>> {
        try {
            const { page, limit, search, sortBy, sortOrder, parentId } = query;

            const whereQuery: Prisma.DanhMucWhereInput = {
                isDelete: false,
                ...(parentId !== undefined && { parentId: parentId || null }),
                ...(search && {
                    OR: [
                        { tenDanhMuc: { contains: search, mode: 'insensitive' } },
                        { maDanhMuc: { contains: search, mode: 'insensitive' } },
                        { moTa: { contains: search, mode: 'insensitive' } },
                    ],
                }),
            };

            const orderByQuery: Prisma.DanhMucOrderByWithRelationInput = {
                [sortBy ?? 'thuTu']: sortOrder ?? 'asc',
            };

            const [categories, total] = await Promise.all([
                this.categoriesRepository.findMany({
                    where: whereQuery,
                    skip: (page - 1) * limit,
                    take: limit,
                    orderBy: orderByQuery,
                    include: {
                        parent: true,
                        children: {
                            where: { isDelete: false },
                            orderBy: { thuTu: 'asc' },
                        },
                    },
                }),
                this.categoriesRepository.count(whereQuery),
            ]);

            return {
                items: categories,
                pagination: buildPagination(page, limit, total),
            };
        } catch (error) {
            this.logger.error('Failed to fetch categories:', toErrorMessage(error));
            throw new InternalServerErrorException('Failed to fetch categories');
        }
    }

    async findOneById(categoryId: string): Promise<DanhMuc> {
        try {
            const category = await this.categoriesRepository.findOneById(categoryId, {
                include: {
                    parent: true,
                    children: {
                        where: { isDelete: false },
                        orderBy: { thuTu: 'asc' },
                    },
                },
            });

            if (!category || category.isDelete) {
                throw new NotFoundException('Category not found');
            }

            return category;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            this.logger.error('Failed to get category:', toErrorMessage(error));
            throw new InternalServerErrorException('Failed to get category');
        }
    }

    async createCategory(
        data: CreateCategoryDto,
        createdBy?: string,
    ): Promise<DanhMuc> {
        try {
            // Check if code already exists
            const existing = await this.categoriesRepository.findOneByCode(data.maDanhMuc);
            if (existing && !existing.isDelete) {
                throw new ConflictException('Category code already exists');
            }

            const category = await this.categoriesRepository.createOne({
                maDanhMuc: data.maDanhMuc,
                tenDanhMuc: data.tenDanhMuc,
                moTa: data.moTa,
                thuTu: data.thuTu ?? 0,
                ...(data.parentId && {
                    parent: { connect: { id: data.parentId } },
                }),
                createdBy,
            });

            return category;
        } catch (error) {
            if (error instanceof ConflictException) throw error;
            this.logger.error('Failed to create category:', toErrorMessage(error));
            throw new InternalServerErrorException('Failed to create category');
        }
    }

    async updateCategory(
        categoryId: string,
        data: UpdateCategoryDto,
        updatedBy?: string,
    ): Promise<DanhMuc> {
        try {
            const existingCategory =
                await this.categoriesRepository.findOneById(categoryId);
            if (!existingCategory || existingCategory.isDelete) {
                throw new NotFoundException('Category not found');
            }

            // Check if new code conflicts with existing
            if (data.maDanhMuc && data.maDanhMuc !== existingCategory.maDanhMuc) {
                const codeExists = await this.categoriesRepository.findOneByCode(data.maDanhMuc);
                if (codeExists && !codeExists.isDelete && codeExists.id !== categoryId) {
                    throw new ConflictException('Category code already exists');
                }
            }

            const updateData: Prisma.DanhMucUpdateInput = {
                ...data,
                updatedBy,
            };

            // Handle parent relationship
            if (data.parentId !== undefined) {
                if (data.parentId === null) {
                    updateData.parent = { disconnect: true };
                } else {
                    updateData.parent = { connect: { id: data.parentId } };
                }
                delete (updateData as Record<string, unknown>).parentId;
            }

            const category = await this.categoriesRepository.updateOneById(
                categoryId,
                updateData,
            );

            return category as DanhMuc;
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof ConflictException) throw error;
            this.logger.error('Failed to update category:', toErrorMessage(error));
            throw new InternalServerErrorException('Failed to update category');
        }
    }

    async deleteCategory(categoryId: string): Promise<{ success: boolean }> {
        try {
            const existingCategory =
                await this.categoriesRepository.findOneById(categoryId);
            if (!existingCategory || existingCategory.isDelete) {
                throw new NotFoundException('Category not found');
            }

            await this.categoriesRepository.softDeleteById(categoryId);

            return { success: true };
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            this.logger.error('Failed to delete category:', toErrorMessage(error));
            throw new InternalServerErrorException('Failed to delete category');
        }
    }

    async restoreCategory(categoryId: string): Promise<DanhMuc> {
        try {
            const existingCategory =
                await this.categoriesRepository.findOneById(categoryId);
            if (!existingCategory) {
                throw new NotFoundException('Category not found');
            }

            return this.categoriesRepository.restoreById(categoryId);
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            this.logger.error('Failed to restore category:', toErrorMessage(error));
            throw new InternalServerErrorException('Failed to restore category');
        }
    }
}
