import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  async sendMail(to: string, subject: string, token: string) {
    const resetUrl = `${process.env.API_URL}/reset-password?token=${token}`;
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Passwort zurücksetzen - ' + process.env.API_URL,
      html: `<div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; border:1px solid #eee; border-radius:8px; padding:32px 24px; background:#fafbfc;">
        <h2 style="color:#2d3748;">Passwort zurücksetzen</h2>
        <p style="font-size:16px; color:#4a5568;">
          Sie haben eine Anfrage zum Zurücksetzen Ihres Passworts gestellt.<br>
          Um Ihr Passwort zurückzusetzen, klicken Sie bitte auf den Button unten:
        </p>
        <a href="${resetUrl}" style="display:inline-block; margin:24px 0; padding:12px 24px; background:#3182ce; color:#fff; text-decoration:none; border-radius:4px; font-size:16px;">
          Passwort zurücksetzen
        </a>
        <p style="font-size:14px; color:#718096;">
          Wenn Sie diese Anfrage nicht gestellt haben, ignorieren Sie bitte diese E-Mail.
        </p>
        <hr style="margin:24px 0;">
        <p style="font-size:12px; color:#a0aec0;">
          Der Link ist 1 Stunde lang gültig.<br>
          ${resetUrl}
        </p>
      </div>
			
			<div>
					<h1>${subject}</h1>
					<a href="${process.env.API_URL}/reset-password?token=${to}">Reset Password</a>
			</div>`,
    });
  }
}
