import nodemailer from 'nodemailer';
import { env } from '../config/env';
import { logger } from '../utils/logger';

let transporter: nodemailer.Transporter | null = null;

async function getTransporter(): Promise<nodemailer.Transporter> {
  if (transporter) return transporter;

  if (env.NODE_ENV !== 'production' || !env.RESEND_API_KEY) {
    const testAccount = await nodemailer.createTestAccount();
    logger.info(
      { user: testAccount.user, preview: 'https://ethereal.email' },
      'Using Ethereal test SMTP — check https://ethereal.email for delivered emails',
    );
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: { user: testAccount.user, pass: testAccount.pass },
    });
  } else {
    transporter = nodemailer.createTransport({
      host: 'smtp.resend.com',
      port: 587,
      secure: false,
      auth: { user: 'resend', pass: env.RESEND_API_KEY },
    });
  }

  return transporter;
}

export async function sendPasswordResetEmail(to: string, resetToken: string): Promise<void> {
  const resetUrl = `${env.RESET_TOKEN_BASE_URL}/auth/reset/${resetToken}`;
  const t = await getTransporter();

  const info = await t.sendMail({
    from: `"FairGig" <${env.EMAIL_FROM}>`,
    to,
    subject: 'Reset your FairGig password',
    text: [
      'You requested a password reset.',
      '',
      `Reset link (expires in 1 hour): ${resetUrl}`,
      '',
      'If you did not request this, you can safely ignore this email.',
    ].join('\n'),
    html: `
      <p>You requested a password reset for your FairGig account.</p>
      <p><a href="${resetUrl}" style="color:#0066cc">Click here to reset your password</a></p>
      <p>This link expires in <strong>1 hour</strong>.</p>
      <p>If you did not request this, you can safely ignore this email.</p>
    `,
  });

  if (env.NODE_ENV !== 'production') {
    logger.info({ previewUrl: nodemailer.getTestMessageUrl(info) }, 'Password reset email (Ethereal preview)');
  }
}

export async function sendRoleApprovedEmail(to: string, newRole: string): Promise<void> {
  const t = await getTransporter();
  await t.sendMail({
    from: `"FairGig" <${env.EMAIL_FROM}>`,
    to,
    subject: `Your FairGig role has been upgraded to ${newRole}`,
    text: `Your account role has been upgraded to "${newRole}". Please log in again to access your new dashboard.`,
    html: `<p>Your FairGig account role has been upgraded to <strong>${newRole}</strong>.</p><p>Please log in again to access your new dashboard.</p>`,
  });
}
