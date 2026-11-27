import { NextResponse } from "next/server";
import { subcontractorSchema } from "@/lib/subcontractor-schema";
import { sendSubcontractorEmail } from "@/services/email/subcontractor-email";

export const runtime = "nodejs";
export const maxDuration = 10;

function isDemoMode() {
  return process.env.CONTACT_FORM_DEMO_MODE === "true" || process.env.VERCEL_ENV === "preview";
}

export async function POST(request: Request) {
  try {
    if (process.env.NEXT_PUBLIC_ENABLE_CONTACT_FORM !== "true") {
      return NextResponse.json({ ok: false, code: "contact_form_disabled" }, { status: 410 });
    }

    // Never send real submissions before the legal content is approved.
    // A misconfigured production deployment must not report demo success.
    if (process.env.VERCEL_ENV === "production" && process.env.CONTACT_FORM_DEMO_MODE === "true") {
      return NextResponse.json({ ok: false, code: "transport_not_configured" }, { status: 503 });
    }
    if (!isDemoMode() && process.env.NEXT_PUBLIC_LEGAL_CONTENT_APPROVED !== "true") {
      return NextResponse.json({ ok: false, code: "contact_form_disabled" }, { status: 410 });
    }

    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > 64 * 1024) {
      return NextResponse.json({ ok: false, code: "payload_too_large" }, { status: 413 });
    }

    const form = await request.formData();
    const parsed = subcontractorSchema.safeParse({
      companyName: form.get("companyName"),
      businessId: form.get("businessId"),
      contactName: form.get("contactName"),
      phone: form.get("phone"),
      email: form.get("email"),
      expertise: form.get("expertise"),
      coverageArea: form.get("coverageArea"),
      qualifications: form.get("qualifications"),
      description: form.get("description"),
      consent: form.get("consent") === "true",
      website: form.get("website") ?? "",
      startedAt: form.get("startedAt")
    });

    if (!parsed.success) {
      return NextResponse.json({ ok: false, code: "invalid_form" }, { status: 400 });
    }
    if (parsed.data.website) return NextResponse.json({ ok: true, mode: "ignored" });
    if (Date.now() - parsed.data.startedAt < 1500) {
      return NextResponse.json({ ok: false, code: "rate_limited" }, { status: 429 });
    }

    if (isDemoMode()) {
      return NextResponse.json({
        ok: true,
        mode: "demo",
        reference: "DEMO-" + crypto.randomUUID().slice(0, 8).toUpperCase()
      });
    }

    const reference = await sendSubcontractorEmail(parsed.data);
    return NextResponse.json({ ok: true, mode: "live", reference });
  } catch (error) {
    console.error("Subcontractor form processing failed", {
      reason: error instanceof Error ? error.message : "unknown"
    });
    const reason = error instanceof Error ? error.message : "unknown";
    if (reason === "resend_not_configured") {
      return NextResponse.json({ ok: false, code: "transport_not_configured" }, { status: 503 });
    }
    return NextResponse.json({ ok: false, code: "unexpected_error" }, { status: 500 });
  }
}
