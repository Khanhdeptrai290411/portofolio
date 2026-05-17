import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `[Portfolio] New message from ${name}`,
      html: `
        <div style="font-family: monospace; max-width: 600px; margin: 0 auto; background: #080d0b; color: #e0e0e0; padding: 2rem; border-radius: 12px; border: 1px solid #1a2e24;">
          <div style="background: #0d1f17; padding: 1rem 1.5rem; border-radius: 8px 8px 0 0; border-bottom: 1px solid #1a2e24; display: flex; align-items: center; gap: 8px;">
            <span style="width:12px;height:12px;border-radius:50%;background:#ff5f57;display:inline-block;"></span>
            <span style="width:12px;height:12px;border-radius:50%;background:#febc2e;display:inline-block;"></span>
            <span style="width:12px;height:12px;border-radius:50%;background:#28c840;display:inline-block;"></span>
            <span style="color:#666;font-size:12px;margin-left:8px;">new_message.sh</span>
          </div>
          <div style="padding: 1.5rem;">
            <p style="color: #00ff99; margin: 0 0 4px 0;">kay@portfolio:~/contact$ cat message.txt</p>
            <br/>
            <p style="margin: 0;"><span style="color:#00ff99;">from:</span> <strong style="color:#fff;">${name}</strong> &lt;${email}&gt;</p>
            <br/>
            <div style="background:#0d1f17;border:1px solid #1a2e24;border-radius:8px;padding:1rem;margin-top:8px;">
              <p style="margin:0;white-space:pre-wrap;color:#e0e0e0;line-height:1.7;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
            </div>
            <br/>
            <p style="color:#666;font-size:12px;margin:0;">Sent from your portfolio contact form</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Mail error:', err);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
