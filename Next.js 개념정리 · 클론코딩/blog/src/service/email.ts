import { createTransport } from 'nodemailer';

export interface EmailData {
  from: string;
  subject: string;
  message: string;
}

const transporter = createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.AUTH_USER,
    pass: process.env.AUTH_PASS,
  },
});

export const sendEmail = async ({ subject, from, message }: EmailData) => {
  const mailData = {
    to: process.env.AUTH_USER,
    subject: `[BLOG] ${subject}`,
    from,
    html: /*html*/ `
      <h1>${subject}</h1>
      <div>${message}</div>
      <br/>
      <p>From: ${from}</p>
    `,
  };

  return transporter.sendMail(mailData);
};
