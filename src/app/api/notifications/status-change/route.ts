import { NextResponse } from "next/server";

const RESEND_KEY = process.env.RESEND_API_KEY || "re_7TKXXdGM_vaQeC7sfj4YBxAZaUzxqPB3F";
const SITE_URL = "https://main.d347u8dwr64mv.amplifyapp.com";

const statusSubjects: Record<string, string> = {
  paid: "Payment Received",
  processing: "Your Tradeline Is Being Processed",
  complete: "Tradeline Added to Your Credit Report",
  cancelled: "Order Cancelled",
};

const statusMessages: Record<string, string> = {
  paid: "We've received your payment and will begin processing your tradeline shortly.",
  processing: "Your tradeline is now being added to your credit report. This typically takes a few business days.",
  complete: "Great news! Your tradeline has been successfully added to your credit report. It will remain on your report for 2 months.",
  cancelled: "Your order has been cancelled. If you have any questions, please contact us.",
};

export async function POST(req: Request) {
  try {
    const { customerEmail, customerName, tradelineBank, tradelineSku, newStatus } = await req.json();

    const subject = statusSubjects[newStatus] || `Order Status Updated: ${newStatus}`;
    const statusMessage = statusMessages[newStatus] || `Your order status has been updated to: ${newStatus}.`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "MyTradelines <no-reply@mytradelines.com>",
        to: customerEmail,
        subject: `${subject} — ${tradelineBank} (${tradelineSku})`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <div style="text-align:center;padding:24px 0;border-bottom:1px solid #e2e8f0">
              <h1 style="color:#1e293b;margin:0;font-size:20px">MyTradelines</h1>
            </div>

            <div style="padding:32px 0">
              <p style="color:#1e293b;font-size:16px;margin:0 0 8px">Hi ${customerName},</p>
              <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 24px">${statusMessage}</p>

              <div style="background:#f0f4f8;border-radius:12px;padding:16px;margin:0 0 24px">
                <table style="width:100%;border-collapse:collapse">
                  <tr><td style="padding:4px 0;color:#64748b;font-size:13px">Tradeline:</td><td style="padding:4px 0;color:#1e293b;font-weight:600;font-size:13px">${tradelineBank} (${tradelineSku})</td></tr>
                  <tr><td style="padding:4px 0;color:#64748b;font-size:13px">Status:</td><td style="padding:4px 0;color:#1e293b;font-weight:600;font-size:13px;text-transform:capitalize">${newStatus}</td></tr>
                </table>
              </div>

              <a href="${SITE_URL}/portal/orders" style="display:inline-block;padding:10px 20px;background:#2563eb;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">
                View My Orders
              </a>
            </div>

            <div style="border-top:1px solid #e2e8f0;padding:16px 0;color:#94a3b8;font-size:12px">
              <p style="margin:0">Questions? Reply to this email or call us at (888) 344-4211.</p>
            </div>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json({ error: err.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send notification." }, { status: 500 });
  }
}
