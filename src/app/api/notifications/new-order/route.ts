import { NextResponse } from "next/server";

const RESEND_KEY = process.env.RESEND_API_KEY || "re_7TKXXdGM_vaQeC7sfj4YBxAZaUzxqPB3F";
const SITE_URL = "https://main.d347u8dwr64mv.amplifyapp.com";

interface TradelineItem {
  bank: string;
  sku: string;
  price: number;
  creditLimit: number;
}

export async function POST(req: Request) {
  try {
    const { orderIds, customerName, customerEmail, tradelines, total } = await req.json() as {
      orderIds: string[];
      customerName: string;
      customerEmail: string;
      tradelines: TradelineItem[];
      total: number;
    };

    const tradelineRows = tradelines
      .map(
        (t) =>
          `<tr>
            <td style="padding:8px;border-bottom:1px solid #e2e8f0">${t.sku}</td>
            <td style="padding:8px;border-bottom:1px solid #e2e8f0">${t.bank}</td>
            <td style="padding:8px;border-bottom:1px solid #e2e8f0">$${t.creditLimit.toLocaleString()}</td>
            <td style="padding:8px;border-bottom:1px solid #e2e8f0;font-weight:600">$${t.price}</td>
          </tr>`
      )
      .join("");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "MyTradelines <no-reply@mytradelines.com>",
        to: "andrewoodley@gmail.com",
        subject: `New Order — ${customerName} ($${total})`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <h2 style="color:#1e293b">New Order Received</h2>
            <table style="width:100%;border-collapse:collapse;margin:16px 0">
              <tr><td style="padding:8px 0;color:#64748b;width:120px">Customer:</td><td style="padding:8px 0;color:#1e293b;font-weight:600">${customerName}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b">Email:</td><td style="padding:8px 0;color:#1e293b"><a href="mailto:${customerEmail}">${customerEmail}</a></td></tr>
              <tr><td style="padding:8px 0;color:#64748b">Order IDs:</td><td style="padding:8px 0;color:#1e293b;font-family:monospace">${orderIds.map((id: string) => id.slice(0, 8)).join(", ")}</td></tr>
            </table>

            <h3 style="color:#1e293b;margin:24px 0 8px">Tradelines Ordered</h3>
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <thead>
                <tr style="background:#f0f4f8">
                  <th style="padding:8px;text-align:left;color:#64748b;font-weight:600">SKU</th>
                  <th style="padding:8px;text-align:left;color:#64748b;font-weight:600">Bank</th>
                  <th style="padding:8px;text-align:left;color:#64748b;font-weight:600">Limit</th>
                  <th style="padding:8px;text-align:left;color:#64748b;font-weight:600">Price</th>
                </tr>
              </thead>
              <tbody>${tradelineRows}</tbody>
              <tfoot>
                <tr style="background:#f0f4f8">
                  <td colspan="3" style="padding:8px;font-weight:700;color:#1e293b">Total</td>
                  <td style="padding:8px;font-weight:700;color:#1e293b">$${total}</td>
                </tr>
              </tfoot>
            </table>

            <div style="margin:24px 0">
              <a href="${SITE_URL}/admin/orders/${orderIds[0]}" style="display:inline-block;padding:10px 20px;background:#2563eb;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">
                View Order in Admin
              </a>
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
