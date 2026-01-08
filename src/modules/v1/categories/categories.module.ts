import { Module } from '@nestjs/common';

import { CategoriesRepository } from './categories.repository';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';

@Module({
    imports: [],
    controllers: [CategoriesController],
    providers: [CategoriesService, CategoriesRepository],
    exports: [CategoriesService, CategoriesRepository],
})
export class CategoriesModule { }
