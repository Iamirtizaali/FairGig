import { notificationRepository } from '../repositories/notification.repository';
import { sendEmail } from '../lib/email';

export interface NotifyInput {
  userId: string;
  title: string;
  body: string;
  link?: string;
  email?: string;
}

export async function notifyUser(input: NotifyInput): Promise<void> {
  // In-app notification (fire-and-forget DB write)
  void notificationRepository.create({
    userId: input.userId,
    title: input.title,
    body: input.body,
    link: input.link,
  });

  // Email (fire-and-forget, only if address provided)
  if (input.email) {
    void sendEmail({
      to: input.email,
      subject: input.title,
      html: `<p>${input.body}</p>${input.link ? `<p><a href="${input.link}">View details</a></p>` : ''}`,
    });
  }
}
