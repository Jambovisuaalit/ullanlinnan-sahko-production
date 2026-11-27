import { contactLinks } from "@/content/company";
export function FloatingWhatsApp() {
  return <a className="floating-whatsapp" href={contactLinks.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Avaa WhatsApp-keskustelu Ullanlinnan Sähkön kanssa">
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M20.5 11.5a8.5 8.5 0 0 1-12.3 7.6L3 20.5l1.4-5.1a8.5 8.5 0 1 1 16.1-3.9Z"/><path d="M8.3 8.2c-.6 1.8 1.8 5.7 4.8 7 .9.4 2.1.3 2.6-.5l.5-1.1-2.5-1.3-.8 1a7.3 7.3 0 0 1-3-3l.9-.9-1.3-2.5-1.2 1.3Z"/></svg>
    <span>WhatsApp</span>
  </a>;
}
