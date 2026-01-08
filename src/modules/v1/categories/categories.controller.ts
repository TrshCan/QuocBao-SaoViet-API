import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ZodValidationPipe } from '@/common/pipes';

import { CategoriesService } from './categories.service';

import {
    findAllCategoriesSchema,
    findCategoryByIdSchema,
    createCategorySchema,
    updateCategorySchema,
} from './validations';

import type { ResponseController } from '@/types/response-controller';
import type {
    CreateCategoryDto,
    FindAllCategoriesDto,
    FindCategoryByIdDto,
    UpdateCategoryDto,
} from './dto';

@Controller({ path: 'categories', version: '1' })
@ApiTags('Categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) { }

    @Get()
    @UsePipes(
        new ZodValidationPipe<FindAllCategoriesDto, FindAllCategoriesDto>({
            query: findAllCategoriesSchema,
        }),
    )
    async findAll(
        @Query() query: FindAllCategoriesDto,
    ): Promise<ResponseController<unknown>> {
        const result = await this.categoriesService.findAll(query);
        return {
            message: 'Categories fetched successfully',
            metadata: result,
        };
    }

    @Get(':categoryId')
    @UsePipes(
        new ZodValidationPipe<FindCategoryByIdDto, FindCategoryByIdDto>({
            param: findCategoryByIdSchema.shape.categoryId,
        }),
    )
    async findOneById(
        @Param('categoryId') categoryId: string,
    ): Promise<ResponseController<unknown>> {
        const result = await this.categoriesService.findOneById(categoryId);
        return {
            message: 'Category fetched successfully',
            metadata: result,
        };
    }

    @Post()
    @UsePipes(
        new ZodValidationPipe<CreateCategoryDto, CreateCategoryDto>({
            body: createCategorySchema,
        }),
    )
    async createCategory(
        @Body() body: CreateCategoryDto,
    ): Promise<ResponseController<unknown>> {
        const result = await this.categoriesService.createCategory(body);
        return {
            message: 'Category created successfully',
            metadata: result,
        };
    }

    @Patch(':categoryId')
    @UsePipes(
        new ZodValidationPipe<
            FindCategoryByIdDto & UpdateCategoryDto,
            FindCategoryByIdDto & UpdateCategoryDto
        >({
            param: findCategoryByIdSchema.shape.categoryId,
            body: updateCategorySchema,
        }),
    )
    async updateCategory(
        @Param('categoryId') categoryId: string,
        @Body() body: UpdateCategoryDto,
    ): Promise<ResponseController<unknown>> {
        const result = await this.categoriesService.updateCategory(categoryId, body);
        return {
            message: 'Category updated successfully',
            metadata: result,
        };
    }

    @Delete(':categoryId')
    @UsePipes(
        new ZodValidationPipe<FindCategoryByIdDto, FindCategoryByIdDto>({
            param: findCategoryByIdSchema.shape.categoryId,
        }),
    )
    async deleteCategory(
        @Param('categoryId') categoryId: string,
    ): Promise<ResponseController<unknown>> {
        const result = await this.categoriesService.deleteCategory(categoryId);
        return {
            message: 'Category deleted successfully',
            metadata: result,
        };
    }

    @Patch(':categoryId/restore')
    @UsePipes(
        new ZodValidationPipe<FindCategoryByIdDto, FindCategoryByIdDto>({
            param: findCategoryByIdSchema.shape.categoryId,
        }),
    )
    async restoreCategory(
        @Param('categoryId') categoryId: string,
    ): Promise<ResponseController<unknown>> {
        const result = await this.categoriesService.restoreCategory(categoryId);
        return {
            message: 'Category restored successfully',
            metadata: result,
        };
    }
}
