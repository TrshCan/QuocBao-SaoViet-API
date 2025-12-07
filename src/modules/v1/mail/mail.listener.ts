import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { MailService } from './mail.service';
import { MailEvents } from '@/common/enums/mail-events';

import type { ForgotPasswordEmailPayload } from './interfaces/email-payload';

@Injectable()
export class MailListener {
  private readonly logger = new Logger(MailListener.name);

  constructor(private readonly mailService: MailService) {}

  // @OnEvent(MailEvents.SEND_PASSWORD_RESET_EMAIL, { async: true })
  // async handlePasswordResetEmail(payload: PasswordResetEmailPayload) {
  //   try {
  //     this.logger.log('Processing password reset email event', {
  //       to: payload.to,
  //     });

  //     await this.mailService.sendPasswordResetEmail(
  //       payload.to,
  //       payload.resetLink,
  //       payload.userName,
  //     );

  //     this.logger.log('Password reset email event processed successfully', {
  //       to: payload.to,
  //     });
  //   } catch (error) {
  //     this.logger.error('Failed to process password reset email event', {
  //       error: error instanceof Error ? error.message : String(error),
  //       payload,
  //     });
  //   }
  // }

  @OnEvent(MailEvents.SEND_FORGOT_PASSWORD_EMAIL, { async: true })
  async handleForgotPasswordEmail(payload: ForgotPasswordEmailPayload) {
    try {
      this.logger.log('Processing forgot password email event', {
        to: payload.to,
      });

      await this.mailService.sendForgotPasswordEmail(
        payload.to,
        payload.resetLink,
        payload.userName,
      );

      this.logger.log('Forgot password email event processed successfully', {
        to: payload.to,
      });
    } catch (error) {
      this.logger.error('Failed to process forgot password email event', {
        error: error instanceof Error ? error.message : String(error),
        payload,
      });
    }
  }
}
