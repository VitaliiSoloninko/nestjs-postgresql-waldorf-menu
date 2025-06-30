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

  async sendMail(to: string, subject: string, text: string) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Reset password - ' + process.env.API_URL,
      text: '',
      html: `<div>
								<h1>${subject}</h1>
								<p>${text}</p>
								<a href="${process.env.API_URL}/reset-password?token=${to}">Reset Password</a>
						 </div>`,
    });
  }
}
