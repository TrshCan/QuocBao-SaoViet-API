import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function ApiDocsPagination(entity: string) {
  return applyDecorators(
    ApiQuery({
      name: 'page',
      type: Number,
      examples: {
        '1': {
          value: 1,
          description: 'Page 1',
        },
      },
    }),
    // ApiQuery({
    //   name: 'offset',
    //   type: Number,
    //   examples: {
    //     '0': {
    //       value: 0,
    //       description: 'Start from 0',
    //     },
    //     '10': {
    //       value: 10,
    //       description: `Skip 10 ${entity}s`,
    //     },
    //   },
    // }),
    ApiQuery({
      name: 'limit',
      type: Number,
      examples: {
        '10': {
          value: 10,
          description: `Get 10 ${entity}s`,
        },
        '50': {
          value: 50,
          description: `Get 50 ${entity}s`,
        },
      },
    }),
    ApiQuery({
      name: 'sortBy',
      type: String,
      examples: {
        createdAt: {
          value: 'createdAt',
          description: 'Sort by createdAt',
        },
      },
    }),
    ApiQuery({
      name: 'sortOrder',
      type: String,
      examples: {
        asc: {
          value: 'asc',
          description: 'Sort in ascending order',
        },
      },
    }),
    ApiQuery({
      name: 'search',
      type: String,
      examples: {
        John: {
          value: 'John',
          description: 'Search by name',
        },
      },
    }),
  );
}
