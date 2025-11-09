import { EnvConfig } from '@/configs';
import { toErrorMessage } from '@/utils';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPPool from 'nodemailer/lib/smtp-pool';

import {
  verifyEmailTemplate,
  verifyEmailText,
} from './templates/verification-email';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter<
    SMTPPool.SentMessageInfo,
    SMTPPool.Options
  >;
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly configService: ConfigService<EnvConfig>) {
    const host = configService.get<EnvConfig['SMTP_HOST']>('SMTP_HOST');
    const port = configService.get<EnvConfig['SMTP_PORT']>('SMTP_PORT');
    const user = configService.get<EnvConfig['SMTP_USER']>('SMTP_USER');
    const pass = configService.get<EnvConfig['SMTP_PASS']>('SMTP_PASS');
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: false, // true for 465, false for other ports
      pool: true,
      maxConnections: 5, // Max concurrent SMTP connections
      maxMessages: 100, // Max messages per connection
      auth: {
        user,
        pass,
      },
    });
  }

  async checkTransporter(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.transporter.verify((error, success) => {
        if (error) {
          this.logger.error('SMTP connection failed:', error);
          reject(new Error('SMTP connection failed'));
        } else {
          this.logger.debug('SMTP server is ready to take our messages');
          resolve(success);
        }
      });
    });
  }

  async sendOtpToEmail(to: string, otp: string, userName: string) {
    const msg: Mail.Options = {
      from: process.env.SMTP_FROM || '"SAOVIET" <noreply@saoviet.com>',
      to,
      subject: 'Verification Code - SaoViet',
      text: verifyEmailText(
        userName,
        otp,
        'Bạn đã yêu cầu đăng nhập vào hệ thống SAOVIET',
      ),
      html: verifyEmailTemplate(
        userName,
        otp,
        'Bạn đã yêu cầu đăng nhập vào hệ thống SAOVIET. Vui lòng sử dụng mã xác thực sau để hoàn tất đăng nhập',
      ),
    };

    try {
      await this.transporter.sendMail(msg);

      this.logger.log('OTP email sent successfully', {
        to,
        timestamp: new Date().toISOString(),
      });
      return true;
    } catch (error) {
      this.logger.error('Failed to send verification email', {
        error: toErrorMessage(error),
        to,
        timestamp: new Date().toISOString(),
      });
      throw new InternalServerErrorException(
        'Failed to send verification email',
      );
    }
  }

  async sendPasswordResetEmail(to: string, otp: string, userName: string) {
    const msg: Mail.Options = {
      from: process.env.SMTP_FROM || '"SAOVIET" <noreply@saoviet.com>',
      to,
      subject: 'Verification Code - SaoViet',
      text: verifyEmailText(
        userName,
        otp,
        'Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản SaoViet',
      ),
      html: verifyEmailTemplate(
        userName,
        otp,
        'Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản SaoViet. Vui lòng sử dụng mã xác thực sau để tiếp tục',
      ),
    };

    try {
      await this.transporter.sendMail(msg);

      this.logger.log('Password reset OTP email sent successfully', {
        to,
        timestamp: new Date().toISOString(),
      });
      return true;
    } catch (error) {
      this.logger.error('Failed to send password reset OTP email', {
        error: toErrorMessage(error),
        to,
        timestamp: new Date().toISOString(),
      });
      throw new InternalServerErrorException(
        'Failed to send password reset email',
      );
    }
  }
}
