import { Resend } from "resend";
import { company } from "@/content/company";
import type { SubcontractorFields } from "@/lib/subcontractor-schema";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function sendSubcontractorEmail(payload: SubcontractorFields) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_FORM_FROM?.trim();
  const recipient = process.env.CONTACT_FORM_RECIPIENT?.trim();

  if (!apiKey || !from || !recipient) throw new Error("resend_not_configured");

  const rows = [
    ["Yritys", payload.companyName],
    ["Y-tunnus", payload.businessId],
    ["Yhteyshenkilö", payload.contactName],
    ["Puhelin", payload.phone],
    ["Sähköposti", payload.email],
    ["Osaamisalueet", payload.expertise],
    ["Toiminta-alue", payload.coverageArea],
    ["Luvat, pätevyydet ja vakuutukset", payload.qualifications]
  ] as const;

  const text = [
    "Uusi alihankkijahakemus – " + company.name,
    "",
    ...rows.map(([label, value]) => label + ": " + value),
    "",
    "Yrityksen kuvaus ja yhteistyötoive:",
    payload.description
  ].join("\n");

  const htmlRows = rows.map(([label, value]) =>
    "<tr><th style=\"padding:8px 12px;text-align:left;vertical-align:top;border-bottom:1px solid #ddd8cf\">" +
    escapeHtml(label) +
    "</th><td style=\"padding:8px 12px;border-bottom:1px solid #ddd8cf\">" +
    escapeHtml(value) +
    "</td></tr>"
  ).join("");

  const html = "<div style=\"margin:0;background:#f2efe9;padding:32px 16px;color:#1a1a1a;font-family:Arial,sans-serif\">" +
    "<div style=\"max-width:680px;margin:0 auto;background:#fbf9f5;border-top:4px solid #d4a359;padding:28px\">" +
    "<p style=\"margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase\">Ullanlinnan Sähkö Oy</p>" +
    "<h1 style=\"margin:0 0 24px;font-family:Georgia,serif;font-size:28px;font-weight:400\">Uusi alihankkijahakemus</h1>" +
    "<table style=\"width:100%;border-collapse:collapse;font-size:15px\">" + htmlRows + "</table>" +
    "<h2 style=\"margin:28px 0 8px;font-family:Georgia,serif;font-size:20px;font-weight:400\">Yrityksen kuvaus ja yhteistyötoive</h2>" +
    "<p style=\"margin:0;white-space:pre-wrap;line-height:1.6\">" + escapeHtml(payload.description) + "</p>" +
    "</div></div>";

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from,
    to: recipient,
    replyTo: payload.email,
    subject: "Uusi alihankkijahakemus: " + payload.companyName,
    text,
    html,
    tags: [
      { name: "source", value: "website-subcontractor" },
      { name: "topic", value: "partner-application" }
    ]
  }, { idempotencyKey: "subcontractor-" + payload.startedAt });

  if (error || !data?.id) throw new Error("resend_send_failed");
  return data.id;
}
