// import { Injectable } from '@nestjs/common';

import { SystemDatabaseProvider as SystemDatabaseProviderEnum } from '@/common/enums';
import { prismaLocalStrategy, prismaNeonStrategy } from '../strategies';

export type SystemDatabaseProviderTypes = SystemDatabaseProviderEnum;

// @Injectable()
// export class PrismaFactory {
//   constructor(private prismaStrategy: PrismaStrategy) {}

//   getStrategy(strategy: SystemDatabaseProviderTypes): PrismaStrategy {
//     switch (strategy) {
//       case SystemDatabaseProviderEnum.NEON:
//         return this.prismaStrategy;
//       default:
//         return this.prismaStrategy;
//     }
//   }
// }
export const getSimplePrismaProvider = (type: SystemDatabaseProviderTypes) => {
  switch (type) {
    case SystemDatabaseProviderEnum.NEON:
      return prismaNeonStrategy;
    case SystemDatabaseProviderEnum.LOCAL:
      return prismaLocalStrategy;
    default:
      return prismaLocalStrategy;
  }
};
