import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { SuppliersRepository } from './suppliers.repository';
import { toErrorMessage } from '@/utils';
import { buildPagination } from '@/utils/format-pagination';

import type { PaginatedResponse } from '@/types/pagination';
import type { Prisma, NhaCungCap } from '@/generated/prisma/client';
import type {
  CreateSupplierDto,
  FindAllSuppliersDto,
  UpdateSupplierDto,
} from './dto';

@Injectable()
export class SuppliersService {
  private readonly logger = new Logger(SuppliersService.name);

  constructor(private suppliersRepository: SuppliersRepository) {}

  async findAll(
    query: FindAllSuppliersDto,
  ): Promise<PaginatedResponse<NhaCungCap>> {
    try {
      const { page, limit, search, sortBy, sortOrder } = query;

      const whereQuery: Prisma.NhaCungCapWhereInput = {
        isDelete: false,
        ...(search && {
          OR: [
            { tenNhaCungCap: { contains: search, mode: 'insensitive' } },
            { diaChi: { contains: search, mode: 'insensitive' } },
            { nguoiLienHe: { contains: search, mode: 'insensitive' } },
            { soDienThoai: { contains: search, mode: 'insensitive' } },
          ],
        }),
      };

      const orderByQuery: Prisma.NhaCungCapOrderByWithRelationInput = {
        [sortBy ?? 'createdAt']: sortOrder ?? 'desc',
      };

      const [suppliers, total] = await Promise.all([
        this.suppliersRepository.findMany({
          where: whereQuery,
          skip: (page - 1) * limit,
          take: limit,
          orderBy: orderByQuery,
        }),
        this.suppliersRepository.count(whereQuery),
      ]);

      return {
        items: suppliers,
        pagination: buildPagination(page, limit, total),
      };
    } catch (error) {
      this.logger.error('Failed to fetch suppliers:', toErrorMessage(error));
      throw new InternalServerErrorException('Failed to fetch suppliers');
    }
  }

  async findOneById(supplierId: string): Promise<NhaCungCap> {
    try {
      const supplier = await this.suppliersRepository.findOneById(supplierId);

      if (!supplier || supplier.isDelete) {
        throw new NotFoundException('Supplier not found');
      }

      return supplier;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error('Failed to get supplier:', toErrorMessage(error));
      throw new InternalServerErrorException('Failed to get supplier');
    }
  }

  async createSupplier(
    data: CreateSupplierDto,
    createdBy?: string,
  ): Promise<NhaCungCap> {
    try {
      const supplier = await this.suppliersRepository.createOne({
        tenNhaCungCap: data.tenNhaCungCap,
        diaChi: data.diaChi,
        nguoiLienHe: data.nguoiLienHe,
        soDienThoai: data.soDienThoai,
        createdBy,
      });

      return supplier;
    } catch (error) {
      this.logger.error('Failed to create supplier:', toErrorMessage(error));
      throw new InternalServerErrorException('Failed to create supplier');
    }
  }

  async updateSupplier(
    supplierId: string,
    data: UpdateSupplierDto,
    updatedBy?: string,
  ): Promise<NhaCungCap> {
    try {
      const existingSupplier =
        await this.suppliersRepository.findOneById(supplierId);
      if (!existingSupplier || existingSupplier.isDelete) {
        throw new NotFoundException('Supplier not found');
      }

      const supplier = await this.suppliersRepository.updateOneById(
        supplierId,
        {
          ...data,
          updatedBy,
        },
      );

      return supplier as NhaCungCap;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error('Failed to update supplier:', toErrorMessage(error));
      throw new InternalServerErrorException('Failed to update supplier');
    }
  }

  async deleteSupplier(supplierId: string): Promise<{ success: boolean }> {
    try {
      const existingSupplier =
        await this.suppliersRepository.findOneById(supplierId);
      if (!existingSupplier || existingSupplier.isDelete) {
        throw new NotFoundException('Supplier not found');
      }

      await this.suppliersRepository.softDeleteById(supplierId);

      return { success: true };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error('Failed to delete supplier:', toErrorMessage(error));
      throw new InternalServerErrorException('Failed to delete supplier');
    }
  }

  async restoreSupplier(supplierId: string): Promise<NhaCungCap> {
    try {
      const existingSupplier =
        await this.suppliersRepository.findOneById(supplierId);
      if (!existingSupplier) {
        throw new NotFoundException('Supplier not found');
      }

      return this.suppliersRepository.restoreById(supplierId);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error('Failed to restore supplier:', toErrorMessage(error));
      throw new InternalServerErrorException('Failed to restore supplier');
    }
  }
}
