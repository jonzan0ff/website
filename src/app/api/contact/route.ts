import { NextRequest } from "next/server";

// The recipient address lives only in server-side environment variables,
// so it never appears in the page, the code or the repository.
export async function POST(req: NextRequest) {
  const { name, email, message, company } = await req.json();

  // Honeypot: real visitors never see or fill the "company" field
  if (company) return Response.json({ ok: true });

  if (
    typeof name !== "string" || !name.trim() || name.length > 200 ||
    typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof message !== "string" || message.trim().length < 2 || message.length > 5000
  ) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "zanoff.org <contact@zanoff.org>",
      to: process.env.CONTACT_TO_EMAIL,
      reply_to: email,
      subject: `zanoff.org message from ${name.trim()}`,
      text: `${message.trim()}\n\n— ${name.trim()} <${email}>`,
    }),
  });

  return Response.json({ ok: res.ok }, { status: res.ok ? 200 : 502 });
}
