"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";

const storageKey = "usoy-analytics-consent-v1";
const consentEvent = "usoy-analytics-consent-change";
type ConsentState = "granted" | "denied" | null;

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(consentEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(consentEvent, callback);
  };
}

function getSnapshot(): ConsentState {
  const stored = window.localStorage.getItem(storageKey);
  return stored === "granted" || stored === "denied" ? stored : null;
}

function getServerSnapshot(): ConsentState {
  return null;
}

export function AnalyticsConsent({ measurementId }: { measurementId: string }) {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function choose(value: Exclude<ConsentState, null>) {
    window.localStorage.setItem(storageKey, value);
    window.dispatchEvent(new Event(consentEvent));
  }

  return (
    <>
      {consent === "granted" ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`} strategy="afterInteractive" />
          <Script id="usoy-ga4-config" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
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
