import { Resend } from "resend";
import { company } from "@/content/company";
import { contactTopicLabels } from "@/content/contact";
import type { ContactFields } from "@/lib/contact-schema";

type ContactEmailPayload = ContactFields & {
  files: readonly File[];
  idempotencyKey: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function sanitizeFilename(value: string) {
  return value.replace(/[^\p{L}\p{N}._ -]/gu, "_").slice(0, 120) || "liite";
}

function buildRows(payload: ContactEmailPayload) {
  return [
    ["Aihe", contactTopicLabels[payload.topic]],
    ["Nimi", payload.name],
    ["Sähköposti", payload.email],
    ["Puhelin", payload.phone || "Ei annettu"],
    ["Kohteen osoite", payload.address || "Ei annettu"]
  ] as const;
}

export async function sendContactEmail(payload: ContactEmailPayload) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_FORM_FROM?.trim();
  const recipient = process.env.CONTACT_FORM_RECIPIENT?.trim();

  if (!apiKey || !from || !recipient) {
    throw new Error("resend_not_configured");
  }

  const rows = buildRows(payload);
  const text = [
    `Uusi yhteydenotto – ${company.name}`,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Viesti:",
    payload.message,
    "",
    `Liitteitä: ${payload.files.length}`
  ].join("\n");

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><th style="padding:8px 12px;text-align:left;vertical-align:top;border-bottom:1px solid #ddd8cf">${escapeHtml(label)}</th><td style="padding:8px 12px;border-bottom:1px solid #ddd8cf">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  const html = `
    <div style="margin:0;background:#f2efe9;padding:32px 16px;color:#1a1a1a;font-family:Arial,sans-serif">
      <div style="max-width:640px;margin:0 auto;background:#fbf9f5;border-top:4px solid #d4a359;padding:28px">
        <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase">Ullanlinnan Sähkö Oy</p>
        <h1 style="margin:0 0 24px;font-family:Georgia,serif;font-size:28px;font-weight:400">Uusi yhteydenotto</h1>
        <table style="width:100%;border-collapse:collapse;font-size:15px">${htmlRows}</table>
        <h2 style="margin:28px 0 8px;font-family:Georgia,serif;font-size:20px;font-weight:400">Viesti</h2>
        <p style="margin:0;white-space:pre-wrap;line-height:1.6">${escapeHtml(payload.message)}</p>
        <p style="margin:24px 0 0;color:#696867;font-size:13px">Liitteitä: ${payload.files.length}</p>
      </div>
    </div>`;

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send(
    {
      from,
      to: recipient,
      replyTo: payload.email,
      subject: `Uusi yhteydenotto: ${contactTopicLabels[payload.topic]}`,
      text,
      html,
      attachments: await Promise.all(
        payload.files.map(async (file) => ({
          filename: sanitizeFilename(file.name),
          content: Buffer.from(await file.arrayBuffer())
        }))
      ),
      tags: [
        { name: "source", value: "website-contact" },
        { name: "topic", value: payload.topic }
      ]
    },
    { idempotencyKey: payload.idempotencyKey }
  );

  if (error || !data?.id) {
    throw new Error("resend_send_failed");
  }

  return data.id;
}
