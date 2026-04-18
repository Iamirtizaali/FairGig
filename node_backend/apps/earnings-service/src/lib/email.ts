import nodemailer from 'nodemailer';
import { env } from '../config/env';
import { logger } from '../utils/logger';

let _transporter: nodemailer.Transporter | null = null;

async function getTransporter(): Promise<nodemailer.Transporter> {
  if (_transporter) return _transporter;

  if (env.NODE_ENV === 'development' && !env.SMTP_HOST) {
    // Ethereal test account — credentials logged at startup
    const testAccount = await nodemailer.createTestAccount();
    logger.info(
      { user: testAccount.user, pass: testAccount.pass, url: 'https://ethereal.email' },
      'Ethereal SMTP test account created',
    );
    _transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: { user: testAccount.user, pass: testAccount.pass },
    });
  } else {
    _transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
    });
  }

  return _transporter;
}

export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
}): Promise<void> {
  try {
    const transport = await getTransporter();
    const info = await transport.sendMail({
      from: env.EMAIL_FROM,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
    });
    if (env.NODE_ENV === 'development') {
      logger.info({ previewUrl: nodemailer.getTestMessageUrl(info) }, 'email sent (dev)');
    }
  } catch (err) {
    logger.warn({ err }, 'email send failed');
  }
}
