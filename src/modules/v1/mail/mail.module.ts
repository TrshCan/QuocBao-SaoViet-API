import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

import { MailService } from './mail.service';
import { MailListener } from './mail.listener';

import type { EnvConfig } from '@/configs';

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvConfig>) => ({
        transport: {
          host: configService.get<EnvConfig['SMTP_HOST']>('SMTP_HOST'),
          port: configService.get<EnvConfig['SMTP_PORT']>('SMTP_PORT'),
          secure: false, // true for 465, false for other ports
          pool: true,
          maxConnections: 5,
          maxMessages: 100,
          auth: {
            user: configService.get<EnvConfig['SMTP_USER']>('SMTP_USER'),
            pass: configService.get<EnvConfig['SMTP_PASS']>('SMTP_PASS'),
          },
        },
        defaults: {
          from:
            configService.get<EnvConfig['SMTP_FROM']>('SMTP_FROM') ||
            '"SAOVIET" <noreply@saoviet.com>',
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [],
  providers: [MailService, MailListener],
  exports: [MailService],
})
export class MailModule {}
