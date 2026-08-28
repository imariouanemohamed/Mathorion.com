import { NextResponse } from "next/server";

const brevoEndpoint = "https://api.brevo.com/v3/contacts/doubleOptinConfirmation";

export async function POST(request: Request) {
  let incoming: { email?: unknown; consent?: unknown; honeypot?: unknown };
  try {
    incoming = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid-request" }, { status: 400 });
  }

  const email = typeof incoming.email === "string" ? incoming.email.trim() : "";
  const consent = incoming.consent === true;
  const honeypot = typeof incoming.honeypot === "string" ? incoming.honeypot : "";

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "invalid-email" }, { status: 400 });
  }
  if (!consent) {
    return NextResponse.json({ error: "consent-required" }, { status: 400 });
  }
  if (honeypot) {
    return NextResponse.json({ error: "invalid-request" }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const siteUrl = process.env.SITE_URL;
  if (!apiKey || !siteUrl) {
    return NextResponse.json({ error: "server-configuration" }, { status: 500 });
  }

  try {
    const response = await fetch(brevoEndpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email,
        includeListIds: [7],
        templateId: 7,
        redirectionUrl: `${siteUrl.replace(/\/$/, "")}/newsletter/confirmed`,
      }),
      redirect: "follow",
    });

    if (response.status !== 201) {
      return NextResponse.json({ error: "brevo-rejected" }, { status: 502 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "brevo-unavailable" }, { status: 502 });
  }
}
