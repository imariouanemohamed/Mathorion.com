import { NextResponse } from "next/server";

const BREVO_EMAIL_ENDPOINT = "https://api.brevo.com/v3/smtp/email";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let incoming: {
    name?: unknown;
    email?: unknown;
    subject?: unknown;
    message?: unknown;
    website?: unknown;
  };

  try {
    incoming = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid-request" }, { status: 400 });
  }

  const name = normalizeText(incoming.name);
  const email = normalizeText(incoming.email);
  const subject = normalizeText(incoming.subject);
  const message = normalizeText(incoming.message);
  const honeypot = normalizeText(incoming.website);

  if (honeypot) {
    return NextResponse.json({ error: "invalid-request" }, { status: 400 });
  }

  if (!name || name.length < 2 || name.length > 100) {
    return NextResponse.json({ error: "missing-required" }, { status: 400 });
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "invalid-email" }, { status: 400 });
  }

  if (!subject || subject.length < 3 || subject.length > 150 || /[\r\n]/.test(subject)) {
    return NextResponse.json({ error: "missing-required" }, { status: 400 });
  }

  if (!message || message.length < 10 || message.length > 5000) {
    return NextResponse.json(
      { error: message.length > 0 && message.length < 10 ? "short-message" : "missing-required" },
      { status: 400 },
    );
  }

  const apiKey = process.env.BREVO_API_KEY?.trim();
  const contactToEmail = process.env.CONTACT_TO_EMAIL?.trim();
  const contactFromEmail = process.env.CONTACT_FROM_EMAIL?.trim();

  if (!apiKey || !contactToEmail || !contactFromEmail) {
    return NextResponse.json({ error: "server-configuration" }, { status: 500 });
  }

  const emailBody = [
    "New message from Mathorion.com",
    "",
    "Name:",
    name,
    "",
    "Email:",
    email,
    "",
    "Subject:",
    subject,
    "",
    "Message:",
    message,
    "",
    "Received via:",
    "Mathorion.com Contact Form",
  ].join("\n");

  try {
    const response = await fetch(BREVO_EMAIL_ENDPOINT, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: {
          name: "Mathorion",
          email: contactFromEmail,
        },
        to: [{ email: contactToEmail }],
        replyTo: {
          email,
          name,
        },
        subject: `[Mathorion Contact] ${subject}`,
        textContent: emailBody,
      }),
    });

    if (response.status !== 201) {
      const brevoStatus = response.status;
      let brevoCode: string | number | null = null;
      let brevoMessage: string | null = null;

      try {
        const errorPayload = (await response.json()) as { code?: string | number; message?: string };
        brevoCode = errorPayload?.code ?? null;
        brevoMessage = errorPayload?.message ?? null;
      } catch {
        // Ignore non-JSON Brevo error payloads and keep only the safe fields that were returned.
      }

      console.error("Brevo contact error", {
        brevoStatus,
        brevoCode,
        brevoMessage,
      });

      return NextResponse.json({ error: "brevo-unavailable" }, { status: 502 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "brevo-unavailable" }, { status: 502 });
  }
}
