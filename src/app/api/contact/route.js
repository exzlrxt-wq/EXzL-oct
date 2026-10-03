import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('[/api/contact] Missing RESEND_API_KEY in environment variables');
      return NextResponse.json({ 
        error: 'Missing RESEND_API_KEY on server. Please add it to Vercel Environment Variables and Redeploy.' 
      }, { status: 500 });
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const body = await request.json();
    const { name, email, phone, project } = body;

    // Validate required fields
    if (!name || !email || !project) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Basic length sanity check
    if (
      String(name).length > 200 ||
      String(email).length > 200 ||
      String(project).length > 3000 ||
      (phone && String(phone).length > 50)
    ) {
      return NextResponse.json({ error: 'Input too long' }, { status: 400 });
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const fromEmail = process.env.FROM_EMAIL || 'hello@mail.exzlr.com';
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: `EXZLR <${fromEmail}>`,
      to: 'ojaskala@gmail.com',
      replyTo: email,
      subject: `New enquiry from ${String(name).slice(0, 100)}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || '—'}`,
        ``,
        `Project / Message:`,
        project,
        ``,
        `IP: ${ip}`,
        `Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`,
      ].join('\n'),
    });

    if (error) {
      console.error('[/api/contact] Resend error:', error);
      return NextResponse.json({ error: error.message || 'Failed to send message via Resend' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('[/api/contact] Catch error:', err);
    return NextResponse.json({ error: err.message || 'Failed to process message' }, { status: 500 });
  }
}
