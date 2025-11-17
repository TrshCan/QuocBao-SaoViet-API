import { Module } from '@nestjs/common';

import { KeyTokenService } from './key-token.service';
import { KeyTokenRepository } from './key-token.repository';

import { PrismaModule } from '@/modules/shared/prisma';
import { IoredisModule } from '@/modules/shared/ioredis';

@Module({
  imports: [
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService<EnvConfig>) => ({
    //     secret: configService.get<string>('JWT_SECRET'),
    //     signOptions: {
    //       expiresIn: configService.get<ms.StringValue>('JWT_EXPIRES_IN'),
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
    PrismaModule,
    IoredisModule,
  ],
  providers: [KeyTokenService, KeyTokenRepository],
  exports: [KeyTokenService, KeyTokenRepository],
})
export class KeyTokenModule {}
