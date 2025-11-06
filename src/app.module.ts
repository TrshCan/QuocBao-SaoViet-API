import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { envConfig, envConfigSchema } from './configs/config-env';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (config) => {
        const result = envConfigSchema.safeParse(config);
        if (!result.success) {
          throw new Error(result.error.message);
        }
        return result.data;
      },
      isGlobal: true,
      envFilePath: '.env',
      load: [() => envConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
