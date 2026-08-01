"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const storageKey = "usoy-analytics-consent-v1";
type ConsentState = "granted" | "denied" | null;

export function AnalyticsConsent({ measurementId }: { measurementId: string }) {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored === "granted" || stored === "denied") setConsent(stored);
    setHydrated(true);
  }, []);

  function choose(value: Exclude<ConsentState, null>) {
    window.localStorage.setItem(storageKey, value);
    setConsent(value);
  }

  if (!hydrated) return null;

  return (
    <>
      {consent === "granted" ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`} strategy="afterInteractive" />
          <Script id="usoy-ga4-config" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${measurementId}', { anonymize_ip: true });`}
          </Script>
        </>
      ) : null}

      {consent === null ? (
        <aside className="analytics-consent" role="dialog" aria-label="Analytiikan valinta" aria-live="polite">
          <div>
            <strong>Analytiikka</strong>
            <p>Käytämme vapaaehtoista analytiikkaa vain sivuston käytön mittaamiseen. Lomakkeen henkilötietoja ei lähetetä analytiikkaan.</p>
          </div>
          <div className="analytics-consent__actions">
            <button className="button button--primary" type="button" onClick={() => choose("granted")}>Salli analytiikka</button>
            <button className="button button--secondary" type="button" onClick={() => choose("denied")}>Vain välttämättömät</button>
          </div>
        </aside>
      ) : null}
    </>
  );
}
