import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Sane rate limiter — 8 submissions per IP per 10 minutes (prevents bot spam, allows multiple human tests)
const rateLimitMap = new Map();
const RATE_LIMIT = 8;
const WINDOW_MS = 10 * 60 * 1000;

function isRateLimited(ip) {
  if (!ip || ip === 'unknown') return false;
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

function getCorsHeaders(request) {
  const origin = request?.headers?.get('origin') || '*';
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(request),
  });
}

export async function POST(request) {
  const headers = getCorsHeaders(request);

  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('[/api/contact] Missing RESEND_API_KEY');
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500, headers });
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json({ 
        error: 'Too many submissions from this connection. Please wait a few minutes before trying again.' 
      }, { status: 429, headers });
    }

    const body = await request.json().catch(() => ({}));

    // Auto-trim all inputs so mobile and laptop keyboards never cause spacing failures
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim().toLowerCase();
    const phone = String(body.phone || '').trim();
    const project = String(body.project || '').trim();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400, headers });
    }

    // Flexible email check
    if (!email.includes('@') || !email.includes('.')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400, headers });
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
      return NextResponse.json({ error: error.message || 'Resend error' }, { status: 500, headers });
    }

    return NextResponse.json({ success: true, id: data?.id }, { status: 200, headers });
  } catch (err) {
    console.error('[/api/contact] Server error:', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500, headers });
  }
}
