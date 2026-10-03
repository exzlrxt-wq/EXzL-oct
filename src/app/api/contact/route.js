import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Simple in-memory rate limiter — max 10 submissions per IP per 10 minutes
const rateLimitMap = new Map();
const RATE_LIMIT = 10;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.ts > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, ts: now });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

export async function POST(request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('[/api/contact] Missing RESEND_API_KEY in environment variables');
      return NextResponse.json({ 
        error: 'Missing RESEND_API_KEY on server. Please add it to Vercel Environment Variables and Redeploy.' 
      }, { status: 500 });
    }

    // Rate limit by IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 });
    }

    const body = await request.json();
    const { name, email, phone, project } = body;

    // Validate required fields
    if (!name || !email || !project) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Input length limits to prevent abuse
    if (
      String(name).length > 100 ||
      String(email).length > 200 ||
      String(project).length > 2000 ||
      (phone && String(phone).length > 30)
    ) {
      return NextResponse.json({ error: 'Input too long' }, { status: 400 });
    }

    // Basic email format check
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
