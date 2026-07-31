"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { contactTopicHints, contactTopicOptions } from "@/content/contact";
import { contactSchema, type ContactFields, type ContactFormInput, validateFiles } from "@/lib/contact-schema";

type SubmissionResponse = {
  ok?: boolean;
  mode?: "live" | "demo" | "ignored";
  reference?: string;
  code?: string;
};

export function ContactForm({ defaultTopic }: { defaultTopic?: ContactFields["topic"] }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submission, setSubmission] = useState<SubmissionResponse | null>(null);
  const [generalError, setGeneralError] = useState("");
  const [fileError, setFileError] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors }
  } = useForm<ContactFormInput, unknown, ContactFields>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      topic: defaultTopic,
      phone: "",
      address: "",
      website: "",
      startedAt: 1,
      consent: false,
      name: "",
      email: "",
      message: ""
    },
    mode: "onBlur"
  });

  const topic = useWatch({ control, name: "topic" });
  const message = useWatch({ control, name: "message" }) ?? "";
  const showAddress = contactTopicOptions.some((option) => option.value === topic && option.needsAddress);

  useEffect(() => {
    setValue("startedAt", Date.now());
  }, [setValue]);

  function focusSummary() {
    requestAnimationFrame(() => document.getElementById("contact-form-summary")?.focus());
  }

  function resetForm() {
    reset({
      topic: defaultTopic,
      phone: "",
      address: "",
      website: "",
      startedAt: Date.now(),
      consent: false,
      name: "",
      email: "",
      message: ""
    });
    setFiles([]);
    setFileError("");
    setGeneralError("");
    setSubmission(null);
    setStatus("idle");
  }

  function onFilesSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files ?? []);
    const validation = validateFiles(selectedFiles);
    setFiles(selectedFiles);
    setFileError(validation ?? "");
  }

  async function submit(values: ContactFields) {
    if (status === "submitting") return;

    const validation = validateFiles(files);
    if (validation) {
      setFileError(validation);
      setStatus("error");
      focusSummary();
      return;
    }

    setStatus("submitting");
    setGeneralError("");
    setFileError("");

    const body = new FormData();
    Object.entries(values).forEach(([key, value]) => body.append(key, String(value)));
    files.forEach((file) => body.append("attachments", file));

    try {
      const response = await fetch("/api/contact", { method: "POST", body });
      const result = (await response.json().catch(() => ({}))) as SubmissionResponse;

      if (!response.ok) {
        if (response.status === 429) throw new Error("rate_limited");
        if (response.status === 413) throw new Error("payload_too_large");
        throw new Error(result.code || "submission_failed");
      }

      setSubmission(result);
      setStatus("success");
    } catch (error) {
      const reason = error instanceof Error ? error.message : "submission_failed";
      const messageByReason: Record<string, string> = {
        rate_limited: "Lomake lähetettiin liian nopeasti. Odota hetki ja yritä uudelleen.",
        payload_too_large: "Liitteiden yhteiskoko on liian suuri. Pienennä tiedostoja ja yritä uudelleen.",
        transport_not_configured: "Lomakkeen lähetys ei ole vielä käytössä. Ota yhteyttä puhelimitse tai sähköpostilla."
      };

      setStatus("error");
      setGeneralError(
        messageByReason[reason] ?? "Lomakkeen lähetys ei onnistunut. Yritä uudelleen tai ota yhteyttä puhelimitse."
      );
      focusSummary();
    }
  }

  if (status === "success") {
    const isDemo = submission?.mode === "demo";
    return (
      <div className="contact-form-success" role="status" aria-live="polite">
        <span className="contact-form-success__mark" aria-hidden="true">✓</span>
        <p className="eyebrow"><span aria-hidden="true" />Valmis</p>
        <h3>{isDemo ? "Demolähetys onnistui" : "Yhteydenotto lähetettiin"}</h3>
        <p>
          {isDemo
            ? "Tämä on asiakasesikatselu, joten tietoja ei lähetetty eteenpäin. Tuotannossa sama lomake toimittaa viestin turvallisesti vastaanottajalle."
            : "Kiitos. Palaamme asiaan annettujen tietojen perusteella."}
        </p>
        {submission?.reference ? <small>Viite: {submission.reference}</small> : null}
        <button className="button button--secondary" type="button" onClick={resetForm}>Lähetä uusi yhteydenotto</button>
      </div>
    );
  }

  const hasErrors = Object.keys(errors).length > 0 || Boolean(fileError) || Boolean(generalError);

  return (
    <form
      className="contact-form"
      noValidate
      onSubmit={handleSubmit(submit, focusSummary)}
      aria-busy={status === "submitting"}
    >
      <div className="form-intro">
        <strong>Yhteydenottopyyntö</strong>
        <span><span aria-hidden="true">*</span> Pakollinen kenttä</span>
      </div>

      {hasErrors ? (
        <div id="contact-form-summary" className="form-summary form-summary--error" role="alert" tabIndex={-1}>
          <strong>Tarkista lomakkeen tiedot.</strong>
          {generalError ? <p>{generalError}</p> : null}
          <ul>
            {Object.entries(errors).map(([key, value]) => (
              <li key={key}><a href={`#contact-${key}`}>{value?.message}</a></li>
            ))}
            {fileError ? <li><a href="#contact-attachments">{fileError}</a></li> : null}
          </ul>
        </div>
      ) : null}

      <div className="form-grid">
        <Field label="Aihe" id="contact-topic" error={errors.topic?.message} required>
          <select
            id="contact-topic"
            aria-invalid={Boolean(errors.topic)}
            aria-describedby={[errors.topic ? "contact-topic-error" : null, topic ? "contact-topic-hint" : null]
              .filter(Boolean)
              .join(" ") || undefined}
            {...register("topic")}
          >
            <option value="">Valitse aihe</option>
            {contactTopicOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          {topic ? <p id="contact-topic-hint" className="field-context">{contactTopicHints[topic]}</p> : null}
        </Field>

        <div className="form-grid form-grid--two">
          <Field label="Nimi" id="contact-name" error={errors.name?.message} required>
            <input
              id="contact-name"
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              {...register("name")}
            />
          </Field>
          <Field label="Sähköposti" id="contact-email" error={errors.email?.message} required>
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              {...register("email")}
            />
          </Field>
        </div>

        <div className="form-grid form-grid--two">
          <Field label="Puhelinnumero" optional id="contact-phone">
            <input id="contact-phone" type="tel" inputMode="tel" autoComplete="tel" {...register("phone")} />
          </Field>
          {showAddress ? (
            <Field label="Kohteen osoite" optional id="contact-address">
              <input id="contact-address" autoComplete="street-address" {...register("address")} />
            </Field>
          ) : null}
        </div>

        <Field
          label="Kuvaus"
          id="contact-message"
          error={errors.message?.message}
          help="Kerro kohde, havainto ja toivottu seuraava vaihe. Älä lähetä tarpeettomia henkilötietoja."
          required
        >
          <textarea
            id="contact-message"
            rows={7}
            maxLength={4000}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={[errors.message ? "contact-message-error" : null, "contact-message-help", "contact-message-count"]
              .filter(Boolean)
              .join(" ")}
            {...register("message")}
          />
          <span id="contact-message-count" className="field-count">{message.length} / 4000</span>
        </Field>

        <Field
          label="Kuvat tai PDF"
          optional
          id="contact-attachments"
          error={fileError}
          help="Enintään 3 tiedostoa, 5 Mt/tiedosto. JPG, PNG, WebP tai PDF."
        >
          <div className="file-field">
            <input
              id="contact-attachments"
              name="attachments"
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp,application/pdf"
              aria-describedby={[fileError ? "contact-attachments-error" : null, "contact-attachments-help"]
                .filter(Boolean)
                .join(" ")}
              onChange={onFilesSelected}
            />
            <span>Valitse kuvat tai PDF-tiedostot</span>
          </div>
          {files.length ? (
            <ul className="file-list" aria-label="Valitut liitteet">
              {files.map((file) => <li key={`${file.name}-${file.size}`}>{file.name}</li>)}
            </ul>
          ) : null}
        </Field>

        <label className="checkbox-field" htmlFor="contact-consent">
          <input
            id="contact-consent"
            type="checkbox"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "contact-consent-error" : undefined}
            {...register("consent")}
          />
          <span>Hyväksyn, että antamiani tietoja käsitellään yhteydenottoon vastaamista varten.</span>
        </label>
        {errors.consent ? <p id="contact-consent-error" className="field-error">{errors.consent.message}</p> : null}

        <div className="honeypot" aria-hidden="true">
          <label htmlFor="contact-website">Verkkosivu</label>
          <input id="contact-website" tabIndex={-1} autoComplete="off" {...register("website")} />
        </div>
        <input type="hidden" {...register("startedAt", { valueAsNumber: true })} />

        <button className="button button--primary button--submit button--full" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? <><span className="spinner" aria-hidden="true" /> Lähetetään…</> : "Lähetä yhteydenotto"}
        </button>
        <p className="form-footnote">Tietoja käytetään vain yhteydenottoon vastaamiseen ja asian arviointiin.</p>
      </div>
    </form>
  );
}

function Field({
  label,
  id,
  error,
  help,
  required = false,
  optional = false,
  children
}: {
  label: string;
  id: string;
  error?: string;
  help?: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {required ? <span className="field-required" aria-hidden="true"> *</span> : null}
        {optional ? <span className="field-optional"> (valinnainen)</span> : null}
      </label>
      {children}
      {help ? <p id={`${id}-help`} className="field-help">{help}</p> : null}
      {error ? <p id={`${id}-error`} className="field-error">{error}</p> : null}
    </div>
  );
}
