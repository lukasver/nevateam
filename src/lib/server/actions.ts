'use server';
import { Resend } from 'resend';
import { Email } from './templates';
import { formValues } from '@/types/projects';

export const sendInvestmentRequest = async (formData: formValues) => {
  try {
    const resend = new Resend(process.env.RESEND);
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'lucas@smat.io',
      subject: 'Hello World',
      reply_to: formData.email,
      react: Email(formData),
    });
    return true;
  } catch (e) {
    return false;
  }
};
