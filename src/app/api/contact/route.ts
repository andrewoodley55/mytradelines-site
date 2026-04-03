import { NextResponse } from "next/server";

const RESEND_KEY = process.env.RESEND_API_KEY || "re_7TKXXdGM_vaQeC7sfj4YBxAZaUzxqPB3F";

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "MyTradelines <no-reply@mytradelines.com>",
        to: "andrewoodley@gmail.com",
        subject: `New Contact Form Message from ${name}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <h2 style="color:#1e293b">New Contact Form Message</h2>
            <table style="width:100%;border-collapse:collapse;margin:16px 0">
              <tr><td style="padding:8px 0;color:#64748b;width:100px">Name:</td><td style="padding:8px 0;color:#1e293b;font-weight:600">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b">Email:</td><td style="padding:8px 0;color:#1e293b"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#64748b">Phone:</td><td style="padding:8px 0;color:#1e293b">${phone || "Not provided"}</td></tr>
            </table>
            <div style="background:#f0f4f8;border-radius:12px;padding:16px;margin:16px 0">
              <p style="color:#64748b;font-size:13px;margin:0 0 8px">Message:</p>
              <p style="color:#1e293b;margin:0;white-space:pre-wrap">${message}</p>
            </div>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json({ error: err.message || "Failed to send email." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
