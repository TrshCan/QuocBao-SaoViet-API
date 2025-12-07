import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { CustomersRepository } from './customers.repository';
import { toErrorMessage } from '@/utils';
import { buildPagination } from '@/utils/format-pagination';

import type { PaginatedResponse } from '@/types/pagination';
import type { Prisma, KhachHang } from '@/generated/prisma/client';
import type {
  CreateCustomerDto,
  FindAllCustomersDto,
  UpdateCustomerDto,
} from './dto';

@Injectable()
export class CustomersService {
  private readonly logger = new Logger(CustomersService.name);

  constructor(private customersRepository: CustomersRepository) {}

  async findAll(
    query: FindAllCustomersDto,
  ): Promise<PaginatedResponse<KhachHang>> {
    try {
      const { page, limit, search, sortBy, sortOrder, loaiKhach } = query;

      const whereQuery: Prisma.KhachHangWhereInput = {
        isDelete: false,
        ...(loaiKhach && { loaiKhach }),
        ...(search && {
          OR: [
            { ten: { contains: search, mode: 'insensitive' } },
            { code: { contains: search, mode: 'insensitive' } },
            { soDienThoai: { contains: search, mode: 'insensitive' } },
            { soDienThoai2: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
            { diaChi: { contains: search, mode: 'insensitive' } },
            { tenCongTy: { contains: search, mode: 'insensitive' } },
          ],
        }),
      };

      const orderByQuery: Prisma.KhachHangOrderByWithRelationInput = {
        [sortBy ?? 'createdAt']: sortOrder ?? 'desc',
      };

      const [customers, total] = await Promise.all([
        this.customersRepository.findMany({
          where: whereQuery,
          skip: (page - 1) * limit,
          take: limit,
          orderBy: orderByQuery,
        }),
        this.customersRepository.count(whereQuery),
      ]);

      return {
        items: customers,
        pagination: buildPagination(page, limit, total),
      };
    } catch (error) {
      this.logger.error('Failed to fetch customers:', toErrorMessage(error));
      throw new InternalServerErrorException('Failed to fetch customers');
    }
  }

  async findOneById(customerId: string): Promise<KhachHang> {
    try {
      const customer = await this.customersRepository.findOneById(customerId);

      if (!customer || customer.isDelete) {
        throw new NotFoundException('Customer not found');
      }

      return customer;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error('Failed to get customer:', toErrorMessage(error));
      throw new InternalServerErrorException('Failed to get customer');
    }
  }

  async createCustomer(
    data: CreateCustomerDto,
    createdBy?: string,
  ): Promise<KhachHang> {
    try {
      const customer = await this.customersRepository.createOne({
        code: data.code,
        ten: data.ten,
        soDienThoai: data.soDienThoai,
        soDienThoai2: data.soDienThoai2,
        email: data.email,
        diaChi: data.diaChi,
        loaiKhach: data.loaiKhach,
        tenCongTy: data.tenCongTy,
        createdBy,
      });

      return customer;
    } catch (error) {
      this.logger.error('Failed to create customer:', toErrorMessage(error));
      throw new InternalServerErrorException('Failed to create customer');
    }
  }

  async updateCustomer(
    customerId: string,
    data: UpdateCustomerDto,
    updatedBy?: string,
  ): Promise<KhachHang> {
    try {
      const existingCustomer =
        await this.customersRepository.findOneById(customerId);
      if (!existingCustomer || existingCustomer.isDelete) {
        throw new NotFoundException('Customer not found');
      }

      const customer = await this.customersRepository.updateOneById(
        customerId,
        {
          ...data,
          updatedBy,
        },
      );

      return customer as KhachHang;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error('Failed to update customer:', toErrorMessage(error));
      throw new InternalServerErrorException('Failed to update customer');
    }
  }

  async deleteCustomer(customerId: string): Promise<{ success: boolean }> {
    try {
      const existingCustomer =
        await this.customersRepository.findOneById(customerId);
      if (!existingCustomer || existingCustomer.isDelete) {
        throw new NotFoundException('Customer not found');
      }

      await this.customersRepository.softDeleteById(customerId);

      return { success: true };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error('Failed to delete customer:', toErrorMessage(error));
      throw new InternalServerErrorException('Failed to delete customer');
    }
  }

  async restoreCustomer(customerId: string): Promise<KhachHang> {
    try {
      const existingCustomer =
        await this.customersRepository.findOneById(customerId);
      if (!existingCustomer) {
        throw new NotFoundException('Customer not found');
      }

      return this.customersRepository.restoreById(customerId);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error('Failed to restore customer:', toErrorMessage(error));
      throw new InternalServerErrorException('Failed to restore customer');
    }
  }
}
