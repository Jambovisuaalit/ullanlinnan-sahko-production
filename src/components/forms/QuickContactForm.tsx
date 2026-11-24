"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { contactTopicLabels, contactTopicOptions } from "@/content/contact";
import { company, contactLinks } from "@/content/company";
import { quickContactSchema, type QuickContactFields, type QuickContactFormInput } from "@/lib/contact-schema";

type SubmissionResponse = {
  ok?: boolean;
  mode?: "live" | "demo" | "ignored";
  reference?: string;
  code?: string;
};

const formEnabled = process.env.NEXT_PUBLIC_ENABLE_CONTACT_FORM === "true";

export function QuickContactForm({ defaultTopic = "electrical" }: { defaultTopic?: QuickContactFields["topic"] }) {
  if (!formEnabled) {
    return (
      <div className="quick-contact-form__fallback" role="note">
        <p>Verkkolomake ei ole tällä hetkellä käytössä. Saat yhteyden suoraan puhelimitse tai WhatsAppissa.</p>
        <div className="button-row">
          <a className="button button--primary" href={contactLinks.phone}>Soita {company.phoneDisplay}</a>
          <a className="button button--secondary" href={contactLinks.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
        <a className="quick-contact-form__email" href={contactLinks.email}>Tai lähetä sähköpostia</a>
      </div>
    );
  }

  return <EnabledQuickContactForm defaultTopic={defaultTopic} />;
}

function EnabledQuickContactForm({ defaultTopic }: { defaultTopic: QuickContactFields["topic"] }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submission, setSubmission] = useState<SubmissionResponse | null>(null);
  const [generalError, setGeneralError] = useState("");
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors }
  } = useForm<QuickContactFormInput, unknown, QuickContactFields>({
    resolver: zodResolver(quickContactSchema),
    defaultValues: {
      topic: defaultTopic,
      name: "",
      phone: "",
      email: "",
      address: "",
      message: "Pyydän yhteydenottoa sähkötyöhön.",
      consent: false,
      website: "",
      startedAt: 1
    },
    mode: "onBlur"
  });

  const topic = useWatch({ control, name: "topic" });

  useEffect(() => {
    setValue("startedAt", Date.now());
  }, [setValue]);

  useEffect(() => {
    if (topic) setValue("message", "Yhteydenottopyyntö: " + contactTopicLabels[topic] + ".");
  }, [setValue, topic]);

  function focusSummary() {
    requestAnimationFrame(() => document.getElementById("quick-contact-form-summary")?.focus());
  }

  function resetForm() {
    reset({
      topic: defaultTopic,
      name: "",
      phone: "",
      email: "",
      address: "",
      message: "Pyydän yhteydenottoa sähkötyöhön.",
      consent: false,
      website: "",
      startedAt: Date.now()
    });
    setSubmission(null);
    setGeneralError("");
    setStatus("idle");
  }

  async function submit(values: QuickContactFields) {
    if (status === "submitting") return;
    setStatus("submitting");
    setGeneralError("");

    const body = new FormData();
    Object.entries(values).forEach(([key, value]) => body.append(key, String(value)));
    body.append("variant", "quick");

    try {
      const response = await fetch("/api/contact", { method: "POST", body });
      const result = (await response.json().catch(() => ({}))) as SubmissionResponse;
      if (!response.ok) throw new Error(result.code || "submission_failed");
      setSubmission(result);
      setStatus("success");
    } catch (error) {
      const reason = error instanceof Error ? error.message : "submission_failed";
      const messages: Record<string, string> = {
        rate_limited: "Lähetä pyyntö uudelleen hetken kuluttua.",
        transport_not_configured: "Lomakkeen lähetys ei ole vielä käytössä. Soita tai lähetä WhatsApp-viesti.",
        contact_form_disabled: "Lomake ei ole tällä hetkellä käytössä. Ota yhteyttä puhelimitse."
      };
      setGeneralError(messages[reason] ?? "Yhteydenotto ei onnistunut. Yritä uudelleen tai soita meille.");
      setStatus("error");
      focusSummary();
    }
  }

  if (status === "success") {
    const demo = submission?.mode === "demo";
    const ignored = submission?.mode === "ignored";
    return (
      <div className="contact-form-success" role="status" aria-live="polite">
        <span className="contact-form-success__mark" aria-hidden="true">✓</span>
        <h3>{demo ? "Esikatselutesti onnistui" : ignored ? "Pyyntö käsiteltiin" : "Yhteydenottopyyntö lähetettiin"}</h3>
        <p>
          {demo
            ? "Tämä oli esikatselutesti. Tietoja ei toimitettu yritykselle."
            : ignored
              ? "Pyyntö käsiteltiin."
              : "Kiitos. Palaamme asiaan antamiesi yhteystietojen perusteella."}
        </p>
        <button className="button button--secondary" type="button" onClick={resetForm}>Lähetä uusi pyyntö</button>
      </div>
    );
  }

  const hasErrors = Object.keys(errors).length > 0 || Boolean(generalError);

  return (
    <form className="contact-form quick-contact-form" noValidate onSubmit={handleSubmit(submit, focusSummary)} aria-busy={status === "submitting"}>
      {hasErrors ? (
        <div id="quick-contact-form-summary" className="form-summary form-summary--error" role="alert" tabIndex={-1}>
          <strong>Tarkista tiedot.</strong>
          {generalError ? <p>{generalError}</p> : null}
          <ul>
            {Object.entries(errors).map(([key, value]) => <li key={key}>{value?.message}</li>)}
          </ul>
        </div>
      ) : null}

      <div className="quick-contact-form__grid">
        <QuickField label="Mitä tarvitset?" id="quick-contact-topic" error={errors.topic?.message} wide>
          <select id="quick-contact-topic" aria-invalid={Boolean(errors.topic)} {...register("topic")}>
            <option value="">Valitse työn tyyppi</option>
            {contactTopicOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </QuickField>
        <QuickField label="Nimi" id="quick-contact-name" error={errors.name?.message}>
          <input id="quick-contact-name" autoComplete="name" aria-invalid={Boolean(errors.name)} {...register("name")} />
        </QuickField>
        <QuickField label="Puhelinnumero" id="quick-contact-phone" error={errors.phone?.message}>
          <input id="quick-contact-phone" type="tel" inputMode="tel" autoComplete="tel" aria-invalid={Boolean(errors.phone)} {...register("phone")} />
        </QuickField>
        <QuickField label="Sähköposti" id="quick-contact-email" error={errors.email?.message} wide>
          <input id="quick-contact-email" type="email" inputMode="email" autoComplete="email" aria-invalid={Boolean(errors.email)} {...register("email")} />
        </QuickField>
      </div>

      <label className="checkbox-field" htmlFor="quick-contact-consent">
        <input id="quick-contact-consent" type="checkbox" aria-invalid={Boolean(errors.consent)} {...register("consent")} />
        <span>Hyväksyn, että tietojani käytetään yhteydenottooni vastaamiseen.</span>
      </label>
      {errors.consent ? <p className="field-error">{errors.consent.message}</p> : null}

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="quick-contact-website">Verkkosivu</label>
        <input id="quick-contact-website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
      <input type="hidden" {...register("message")} />
      <input type="hidden" {...register("startedAt", { valueAsNumber: true })} />

      <button className="button button--primary button--submit button--full" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Lähetetään…" : "Pyydä yhteydenottoa"}
      </button>
      <p className="form-footnote">Tietoja käytetään vain yhteydenottoosi vastaamiseen.</p>
    </form>
  );
}

function QuickField({
  label,
  id,
  error,
  wide = false,
  children
}: {
  label: string;
  id: string;
  error?: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={wide ? "field quick-contact-form__field--wide" : "field"}>
      <label htmlFor={id}>{label} <span className="field-required" aria-hidden="true">*</span></label>
      {children}
      {error ? <p className="field-error">{error}</p> : null}
    </div>
  );
}
