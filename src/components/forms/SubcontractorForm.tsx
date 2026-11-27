"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { contactLinks } from "@/content/company";
import { subcontractorSchema, type SubcontractorFields, type SubcontractorFormInput } from "@/lib/subcontractor-schema";

type SubmissionResponse = {
  ok?: boolean;
  mode?: "live" | "demo" | "ignored";
  reference?: string;
  code?: string;
};

const formEnabled = process.env.NEXT_PUBLIC_ENABLE_CONTACT_FORM === "true";

export function SubcontractorForm() {
  if (!formEnabled) {
    return (
      <div className="subcontractor-form__fallback" role="note">
        <p>Hakemuslomake ei ole tällä hetkellä käytössä. Voit tiedustella yhteistyötä sähköpostitse.</p>
        <a className="button button--primary" href={contactLinks.email}>Lähetä sähköpostia</a>
      </div>
    );
  }
  return <EnabledSubcontractorForm />;
}

function EnabledSubcontractorForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [generalError, setGeneralError] = useState("");
  const [submission, setSubmission] = useState<SubmissionResponse | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<SubcontractorFormInput, unknown, SubcontractorFields>({
    resolver: zodResolver(subcontractorSchema),
    defaultValues: {
      companyName: "",
      businessId: "",
      contactName: "",
      phone: "",
      email: "",
      expertise: "",
      coverageArea: "",
      qualifications: "",
      description: "",
      consent: false,
      website: "",
      startedAt: 1
    },
    mode: "onBlur"
  });

  useEffect(() => {
    setValue("startedAt", Date.now());
  }, [setValue]);

  function focusSummary() {
    requestAnimationFrame(() => document.getElementById("subcontractor-form-summary")?.focus());
  }

  function resetForm() {
    reset({
      companyName: "",
      businessId: "",
      contactName: "",
      phone: "",
      email: "",
      expertise: "",
      coverageArea: "",
      qualifications: "",
      description: "",
      consent: false,
      website: "",
      startedAt: Date.now()
    });
    setSubmission(null);
    setGeneralError("");
    setStatus("idle");
  }

  async function submit(values: SubcontractorFields) {
    if (status === "submitting") return;
    setStatus("submitting");
    setGeneralError("");
    const body = new FormData();
    Object.entries(values).forEach(([key, value]) => body.append(key, String(value)));

    try {
      const response = await fetch("/api/subcontractor", { method: "POST", body });
      const result = (await response.json().catch(() => ({}))) as SubmissionResponse;
      if (!response.ok) throw new Error(result.code || "submission_failed");
      if (
        result.ok !== true ||
        !["live", "demo", "ignored"].includes(result.mode ?? "") ||
        (result.mode === "live" && !result.reference)
      ) {
        throw new Error("submission_failed");
      }
      setSubmission(result);
      setStatus("success");
    } catch (error) {
      const reason = error instanceof Error ? error.message : "submission_failed";
      const messages: Record<string, string> = {
        rate_limited: "Lähetä hakemus uudelleen hetken kuluttua.",
        transport_not_configured: "Hakemuksen sähköpostitoimitus ei ole vielä käytössä. Ota yhteyttä sähköpostitse.",
        contact_form_disabled: "Hakemuslomake ei ole tällä hetkellä käytössä."
      };
      setGeneralError(messages[reason] ?? "Hakemuksen lähetys ei onnistunut. Tarkista tiedot tai ota yhteyttä sähköpostitse.");
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
        <h3>{demo ? "Esikatselutesti onnistui" : ignored ? "Pyyntö käsiteltiin" : "Hakemus lähetettiin"}</h3>
        <p>{demo ? "Tämä oli esikatselutesti. Hakemusta ei toimitettu yritykselle." : ignored ? "Pyyntö käsiteltiin." : "Kiitos. Käymme hakemuksen läpi ja palaamme tarvittaessa asiaan."}</p>
        <button className="button button--secondary" type="button" onClick={resetForm}>Lähetä uusi hakemus</button>
      </div>
    );
  }

  const hasErrors = Object.keys(errors).length > 0 || Boolean(generalError);

  return (
    <form className="contact-form subcontractor-form" noValidate onSubmit={handleSubmit(submit, focusSummary)} aria-busy={status === "submitting"}>
      {hasErrors ? (
        <div id="subcontractor-form-summary" className="form-summary form-summary--error" role="alert" tabIndex={-1}>
          <strong>Tarkista hakemuksen tiedot.</strong>
          {generalError ? <p>{generalError}</p> : null}
          <ul>{Object.entries(errors).map(([key, value]) => <li key={key}>{value?.message}</li>)}</ul>
        </div>
      ) : null}

      <div className="subcontractor-form__grid">
        <FormField label="Yrityksen nimi" id="partner-company" error={errors.companyName?.message}>
          <input id="partner-company" autoComplete="organization" aria-invalid={Boolean(errors.companyName)} aria-describedby={errors.companyName ? "partner-company-error" : undefined} {...register("companyName")} />
        </FormField>
        <FormField label="Y-tunnus" id="partner-business-id" error={errors.businessId?.message}>
          <input id="partner-business-id" inputMode="numeric" placeholder="1234567-8" aria-invalid={Boolean(errors.businessId)} aria-describedby={errors.businessId ? "partner-business-id-error" : undefined} {...register("businessId")} />
        </FormField>
        <FormField label="Yhteyshenkilö" id="partner-contact" error={errors.contactName?.message}>
          <input id="partner-contact" autoComplete="name" aria-invalid={Boolean(errors.contactName)} aria-describedby={errors.contactName ? "partner-contact-error" : undefined} {...register("contactName")} />
        </FormField>
        <FormField label="Puhelinnumero" id="partner-phone" error={errors.phone?.message}>
          <input id="partner-phone" type="tel" inputMode="tel" autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "partner-phone-error" : undefined} {...register("phone")} />
        </FormField>
        <FormField label="Sähköposti" id="partner-email" error={errors.email?.message} wide>
          <input id="partner-email" type="email" inputMode="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "partner-email-error" : undefined} {...register("email")} />
        </FormField>
        <FormField label="Sähköalan osaamisalueet" id="partner-expertise" error={errors.expertise?.message} wide help="Esimerkiksi sähköasennukset, vikakorjaukset, valaistus tai kiinteistöjen sähkötyöt.">
          <textarea id="partner-expertise" rows={3} aria-invalid={Boolean(errors.expertise)} aria-describedby={errors.expertise ? "partner-expertise-error" : undefined} {...register("expertise")} />
        </FormField>
        <FormField label="Toiminta-alue" id="partner-area" error={errors.coverageArea?.message} wide>
          <input id="partner-area" placeholder="Esim. Helsinki ja pääkaupunkiseutu" aria-invalid={Boolean(errors.coverageArea)} aria-describedby={errors.coverageArea ? "partner-area-error" : undefined} {...register("coverageArea")} />
        </FormField>
        <FormField label="Luvat, pätevyydet ja vakuutukset" id="partner-qualifications" error={errors.qualifications?.message} wide>
          <textarea id="partner-qualifications" rows={3} aria-invalid={Boolean(errors.qualifications)} aria-describedby={errors.qualifications ? "partner-qualifications-error" : undefined} {...register("qualifications")} />
        </FormField>
        <FormField label="Kerro yrityksestä ja toivotusta yhteistyöstä" id="partner-description" error={errors.description?.message} wide>
          <textarea id="partner-description" rows={5} aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? "partner-description-error" : undefined} {...register("description")} />
        </FormField>
      </div>

      <label className="checkbox-field" htmlFor="partner-consent">
        <input id="partner-consent" type="checkbox" aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "partner-consent-error" : undefined} {...register("consent")} />
        <span>Hyväksyn, että tietojani käsitellään alihankkijahakemuksen arviointia ja yhteydenottoa varten.</span>
      </label>
      {errors.consent ? <p id="partner-consent-error" className="field-error">{errors.consent.message}</p> : null}

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="partner-website">Verkkosivu</label>
        <input id="partner-website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
      <input type="hidden" {...register("startedAt", { valueAsNumber: true })} />

      <button className="button button--primary button--submit button--full" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Lähetetään…" : "Lähetä alihankkijahakemus"}
      </button>
      <p className="form-footnote">Hakemuksen lähettäminen ei vielä tarkoita yhteistyösopimusta.</p>
    </form>
  );
}

function FormField({
  label,
  id,
  error,
  help,
  wide = false,
  children
}: {
  label: string;
  id: string;
  error?: string;
  help?: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={wide ? "field subcontractor-form__field--wide" : "field"}>
      <label htmlFor={id}>{label} <span className="field-required" aria-hidden="true">*</span></label>
      {children}
      {help ? <p className="field-help">{help}</p> : null}
      {error ? <p id={id + "-error"} className="field-error">{error}</p> : null}
    </div>
  );
}
