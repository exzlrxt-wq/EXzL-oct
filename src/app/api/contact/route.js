import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('[/api/contact] Missing RESEND_API_KEY');
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const body = await request.json().catch(() => ({}));

    // Auto-trim all inputs so mobile keyboard auto-spaces never cause failures
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim().toLowerCase();
    const phone = String(body.phone || '').trim();
    const project = String(body.project || '').trim();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // Flexible email check
    if (!email.includes('@') || !email.includes('.')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const fromEmail = process.env.FROM_EMAIL || 'hello@mail.exzlr.com';
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: `EXZLR <${fromEmail}>`,
      to: 'ojaskala@gmail.com',
      replyTo: email,
      subject: `New enquiry from ${name.slice(0, 80)}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || 'Not provided'}`,
        ``,
        `Project / Bottleneck:`,
        project || 'Not provided',
        ``,
        `IP: ${ip}`,
        `Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`,
      ].join('\n'),
    });

    if (error) {
      console.error('[/api/contact] Resend error:', error);
      return NextResponse.json({ error: error.message || 'Resend error' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('[/api/contact] Server error:', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
