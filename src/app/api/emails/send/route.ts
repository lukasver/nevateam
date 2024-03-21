import Email from '@/emails/index';
import { renderAsync } from '@react-email/components';
import { NextRequest, NextResponse } from 'next/server';
import React from 'react';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const formData = await req.json();

  try {
    const html = await renderAsync(React.createElement(Email, formData));
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.RESEND}`,
      },
      body: JSON.stringify({
        from: process.env.FROM_EMAIL,
        to: [process.env.TO_EMAIL],
        reply_to: formData.email,
        bcc: [process.env.BCC_EMAIL],
        subject: '[NevaTeam] Investment request received 🎉',
        html,
      }),
    });
    console.log('RESPONSE', res);
    if (res.ok) {
      console.log('ENTRE AL OK');
      const data = await res.json();
      return NextResponse.json({ ...data, success: true });
    }

    const response = await res.json();
    return NextResponse.json({ success: false, ...response });
  } catch (e) {
    return NextResponse.json({
      error: e instanceof Error ? e?.message : 'Error sending email',
      success: false,
    });
  }
}
