import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import nodemailer from 'nodemailer';
import {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SMTP_SECURE,
  SMTP_FROM,
  CONTACT_RECIPIENT
} from '$env/static/private';

const RECIPIENT = CONTACT_RECIPIENT || 'info@smarthealthandscience.nl';
const PORT = SMTP_PORT ? Number(SMTP_PORT) : 587;
const SECURE = SMTP_SECURE ? SMTP_SECURE === 'true' : PORT === 465;
const FROM_ADDRESS = SMTP_FROM || SMTP_USER || 'no-reply@smarthealthandscience.nl';

if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
  console.warn('SMTP credentials are not fully configured. Contact form emails will fail.');
}

const transporter =
  SMTP_HOST && SMTP_USER && SMTP_PASS
    ? nodemailer.createTransport({
        host: SMTP_HOST,
        port: PORT,
        secure: SECURE,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS
        }
      })
    : null;

type ContactPayload = {
  phonePrefix?: string;
  phoneNumber?: string;
  email?: string;
  message?: string;
  language?: string;
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) =>
    ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[char] ?? char)
  );

export const POST: RequestHandler = async ({ request }) => {
  let payload: ContactPayload | null = null;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return json({ ok: false, error: 'invalid_payload' }, { status: 400 });
  }

  const message = (payload?.message ?? '').toString().trim();
  const email = (payload?.email ?? '').toString().trim();
  const phonePrefix = (payload?.phonePrefix ?? '').toString().trim();
  const phoneNumber = (payload?.phoneNumber ?? '').toString().trim();
  const combinedPhone = `${phonePrefix}${phoneNumber}`.replace(/[^\d+]/g, '');
  const language = (payload?.language ?? '').toString().trim() || 'unknown';

  if (!message) {
    return json({ ok: false, error: 'message_required' }, { status: 400 });
  }

  if (!combinedPhone && !email) {
    return json({ ok: false, error: 'contact_required' }, { status: 400 });
  }

  if (!transporter) {
    return json({ ok: false, error: 'mail_not_configured' }, { status: 500 });
  }

  const phoneDisplay = combinedPhone ? `${phonePrefix} ${phoneNumber}`.trim() : 'Not provided';
  const emailDisplay = email || 'Not provided';
  const htmlMessage = escapeHtml(message).replace(/\n/g, '<br>');

  try {
    await transporter.sendMail({
      from: FROM_ADDRESS,
      to: RECIPIENT,
      subject: 'New contact request from Smart Health website',
      text: [
        `Language: ${language}`,
        `Email: ${emailDisplay}`,
        `Phone: ${phoneDisplay}`,
        '',
        'Message:',
        message
      ].join('\n'),
      html: `
        <p><strong>Language:</strong> ${escapeHtml(language)}</p>
        <p><strong>Email:</strong> ${escapeHtml(emailDisplay)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phoneDisplay)}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${htmlMessage}</p>
      `
    });
  } catch (error) {
    console.error('Failed to send contact email:', error);
    return json({ ok: false, error: 'mail_failed' }, { status: 500 });
  }

  return json({ ok: true });
};

