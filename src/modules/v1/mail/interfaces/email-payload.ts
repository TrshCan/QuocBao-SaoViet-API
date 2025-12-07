export interface PasswordResetEmailPayload {
  to: string;
  resetLink: string;
  userName: string;
}

export interface ForgotPasswordEmailPayload {
  to: string;
  resetLink: string;
  userName: string;
}

export interface OtpEmailPayload {
  to: string;
  otp: string;
  userName: string;
  purpose?: 'login' | 'verification';
}

export interface WelcomeEmailPayload {
  to: string;
  userName: string;
}
