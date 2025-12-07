import { toErrorMessage } from '@/utils';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

import type { EnvConfig } from '@/configs';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService<EnvConfig>,
  ) {}

  async checkTransporter(): Promise<boolean> {
    try {
      await this.mailerService.sendMail({
        to: this.configService.get<EnvConfig['SMTP_USER']>('SMTP_USER'),
        subject: 'Test Connection',
        text: 'SMTP server is ready',
      });
      this.logger.debug('SMTP server is ready to take our messages');
      return true;
    } catch (error) {
      this.logger.error('SMTP connection failed:', error);
      throw new Error('SMTP connection failed');
    }
  }

  //   async sendOtpToEmail(to: string, otp: string, userName: string) {
  //     const msg: Mail.Options = {
  //       from: process.env.SMTP_FROM || '"SAOVIET" <noreply@saoviet.com>',
  //       to,
  //       subject: 'Verification Code - SaoViet',
  //       text: verifyEmailText(
  //         userName,
  //         otp,
  //         'Bạn đã yêu cầu đăng nhập vào hệ thống SAOVIET',
  //       ),
  //       html: verifyEmailTemplate(
  //         userName,
  //         otp,
  //         'Bạn đã yêu cầu đăng nhập vào hệ thống SAOVIET. Vui lòng sử dụng mã xác thực sau để hoàn tất đăng nhập',
  //       ),
  //     };

  //     try {
  //       await this.transporter.sendMail(msg);

  //       this.logger.log('OTP email sent successfully', {
  //         to,
  //         timestamp: new Date().toISOString(),
  //       });
  //       return true;
  //     } catch (error) {
  //       this.logger.error('Failed to send verification email', {
  //         error: toErrorMessage(error),
  //         to,
  //         timestamp: new Date().toISOString(),
  //       });
  //       throw new InternalServerErrorException(
  //         'Failed to send verification email',
  //       );
  //     }
  //   }

  async sendPasswordResetEmail(
    to: string,
    resetLink: string,
    userName: string,
  ): Promise<boolean> {
    try {
      const appName = this.configService.get<string>('APP_NAME') || 'SAOVIET';
      const currentYear = new Date().getFullYear();

      await this.mailerService.sendMail({
        to,
        subject: 'Password Reset Request - SAOVIET',
        template: 'password-reset',
        context: {
          userName,
          resetLink,
          appName,
          currentYear,
        },
      });

      this.logger.log('Password reset email sent successfully', {
        to,
        timestamp: new Date().toISOString(),
      });

      return true;
    } catch (error) {
      this.logger.error('Failed to send password reset email', {
        error: toErrorMessage(error),
        to,
        timestamp: new Date().toISOString(),
      });
      throw new InternalServerErrorException(
        'Failed to send password reset email',
      );
    }
  }

  // async sendOtpEmail(
  //   to: string,
  //   otp: string,
  //   userName: string,
  //   purpose: 'login' | 'verification' = 'login',
  // ): Promise<boolean> {
  //   try {
  //     const appName = this.configService.get<string>('APP_NAME') || 'SAOVIET';
  //     const currentYear = new Date().getFullYear();
  //     const subjectMap = {
  //       login: 'Verification Code - Login',
  //       verification: 'Verification Code - Email Verification',
  //     };

  //     await this.mailerService.sendMail({
  //       to,
  //       subject: `${subjectMap[purpose]} - ${appName}`,
  //       template: 'otp-verification',
  //       context: {
  //         userName,
  //         otp,
  //         appName,
  //         currentYear,
  //         purpose: purpose === 'login' ? 'đăng nhập' : 'xác thực email',
  //       },
  //     });

  //     this.logger.log(`OTP email sent successfully (${purpose})`, {
  //       to,
  //       timestamp: new Date().toISOString(),
  //     });

  //     return true;
  //   } catch (error) {
  //     this.logger.error(`Failed to send OTP email (${purpose})`, {
  //       error: toErrorMessage(error),
  //       to,
  //       timestamp: new Date().toISOString(),
  //     });
  //     throw new InternalServerErrorException(
  //       'Failed to send verification email',
  //     );
  //   }
  // }

  async sendForgotPasswordEmail(
    to: string,
    resetLink: string,
    userName: string,
  ): Promise<boolean> {
    try {
      const appName = this.configService.get<string>('APP_NAME') || 'SAOVIET';
      const currentYear = new Date().getFullYear();

      await this.mailerService.sendMail({
        to,
        subject: 'Forgot Password Request - SAOVIET',
        template: 'forgot-password',
        context: {
          userName,
          resetLink,
          appName,
          currentYear,
        },
      });

      this.logger.log('Forgot password email sent successfully', {
        to,
        timestamp: new Date().toISOString(),
      });

      return true;
    } catch (error) {
      this.logger.error('Failed to send forgot password email', {
        error: toErrorMessage(error),
        to,
        timestamp: new Date().toISOString(),
      });
      throw new InternalServerErrorException(
        'Failed to send forgot password email',
      );
    }
  }
}
