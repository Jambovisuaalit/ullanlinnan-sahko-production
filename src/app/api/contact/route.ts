import { NextResponse } from "next/server";
import { contactSchema, validateFiles } from "@/lib/contact-schema";
import { sendContactEmail } from "@/services/email/contact-email";

export const runtime = "nodejs";
export const maxDuration = 10;

const maxRequestBytes = 16 * 1024 * 1024;

function hasResendConfiguration() {
  return Boolean(
    process.env.RESEND_API_KEY?.trim() &&
    process.env.CONTACT_FORM_FROM?.trim() &&
    process.env.CONTACT_FORM_RECIPIENT?.trim()
  );
}

function isDemoMode() {
  return process.env.CONTACT_FORM_DEMO_MODE === "true" || process.env.VERCEL_ENV === "preview";
}

function attachmentsEnabled() {
  return process.env.NEXT_PUBLIC_ENABLE_CONTACT_ATTACHMENTS === "true";
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > maxRequestBytes) {
      return NextResponse.json({ ok: false, code: "payload_too_large" }, { status: 413 });
    }

    const form = await request.formData();
    const parsed = contactSchema.safeParse({
      topic: form.get("topic"), name: form.get("name"), email: form.get("email"), phone: form.get("phone") || undefined,
      address: form.get("address") || undefined, message: form.get("message"), consent: form.get("consent") === "true",
      website: form.get("website") ?? "", startedAt: form.get("startedAt")
    });
    if (!parsed.success) return NextResponse.json({ ok: false, code: "invalid_form" }, { status: 400 });
    if (parsed.data.website) return NextResponse.json({ ok: true, mode: "ignored" });
    if (Date.now() - parsed.data.startedAt < 1500) return NextResponse.json({ ok: false, code: "rate_limited" }, { status: 429 });

    const files = form.getAll("attachments").filter((value): value is File => value instanceof File && value.size > 0);
    if (files.length > 0 && !attachmentsEnabled()) {
      return NextResponse.json({ ok: false, code: "attachments_disabled" }, { status: 400 });
    }
    if (attachmentsEnabled() && validateFiles(files)) {
      return NextResponse.json({ ok: false, code: "invalid_files" }, { status: 400 });
    }

    if (isDemoMode()) {
      return NextResponse.json({
        ok: true,
        mode: "demo",
        reference: `DEMO-${crypto.randomUUID().slice(0, 8).toUpperCase()}`
      });
    }

    const idempotencyKey = `contact-${parsed.data.startedAt}-${parsed.data.topic}`;
    if (hasResendConfiguration()) {
      const reference = await sendContactEmail({ ...parsed.data, files, idempotencyKey });
      return NextResponse.json({ ok: true, mode: "live", reference });
    }

    const webhook = process.env.CONTACT_FORM_WEBHOOK_URL;
    if (webhook) {
      const outbound = new FormData();
      for (const [key, value] of Object.entries(parsed.data)) if (key !== "website") outbound.append(key, String(value));
      files.forEach((file) => outbound.append("attachments", file, file.name));
      const response = await fetch(webhook, { method: "POST", body: outbound, cache: "no-store" });
      if (!response.ok) return NextResponse.json({ ok: false, code: "transport_failed" }, { status: 502 });
      return NextResponse.json({ ok: true, mode: "live", reference: idempotencyKey });
    }

    return NextResponse.json({ ok: false, code: "transport_not_configured" }, { status: 503 });
  } catch (error) {
    console.error("Contact form processing failed", {
      reason: error instanceof Error ? error.message : "unknown"
    });
    return NextResponse.json({ ok: false, code: "unexpected_error" }, { status: 500 });
  }
}
