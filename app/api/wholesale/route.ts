import { NextResponse } from 'next/server';

// Utility to neutralize potential XSS attacks by escaping HTML characters
function sanitizeText(text: string) {
  if (!text) return text;
  return text.replace(/[<&>]/g, function (char) {
    switch (char) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      default: return char;
    }
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, company, port, volume, details } = body;

    // 1. Strict Server-Side Validation (Required fields check)
    if (!firstName || !lastName || !email || !company || !volume || !details) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 2. Format Validation (Ensuring a valid email structure)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // 3. XSS & SQL Injection Sanitization
    const safeData = {
      firstName: sanitizeText(firstName),
      lastName: sanitizeText(lastName),
      email: sanitizeText(email), // Emails are validated above, but sanitized for extra safety
      company: sanitizeText(company),
      port: sanitizeText(port),
      volume: sanitizeText(volume),
      details: sanitizeText(details),
    };

    // 4. Secure Database/CRM Processing (Mocked for Phase 7)
    console.log('✅ SECURE B2B INQUIRY PROCESSED:', safeData);
    
    // In a live environment, you would push `safeData` to Sanity or an email service here.

    return NextResponse.json({ success: true, message: 'Inquiry received securely.' }, { status: 200 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}