"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { siteNavigation } from "@/content/navigation";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/ButtonLink";

const DESKTOP_MEDIA_QUERY = "(min-width: 68rem)";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({
  href,
  label,
  pathname,
  onNavigate
}: {
  href: string;
  label: string;
  pathname: string;
  onNavigate?: () => void;
}) {
  const active = isActive(pathname, href);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={active ? "is-active" : undefined}
    >
      <span>{label}</span>
      {active ? <span className="sr-only">, nykyinen sivu</span> : null}
    </Link>
  );
}

export function SiteNavigation() {
  const pathname = usePathname();
  return <SiteNavigationState key={pathname} pathname={pathname} />;
}

function SiteNavigationState({ pathname }: { pathname: string }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerTriggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const closeDrawer = useCallback((restoreFocus = true) => {
    setDrawerOpen(false);
    if (restoreFocus) requestAnimationFrame(() => drawerTriggerRef.current?.focus());
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
    function syncNavigationMode(event?: MediaQueryListEvent) {
      if (event?.matches ?? desktopQuery.matches) setDrawerOpen(false);
    }
    syncNavigationMode();
    desktopQuery.addEventListener("change", syncNavigationMode);
    return () => desktopQuery.removeEventListener("change", syncNavigationMode);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    const root = drawerRef.current;
    if (!root) return;

    document.documentElement.classList.add("nav-open");
    document.body.classList.add("nav-open");
    document.body.dataset.scrollLock = "true";
    root.querySelector<HTMLElement>("[data-drawer-close]")?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDrawer(true);
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = Array.from(
        root.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      ).filter((element) => !element.hasAttribute("hidden"));
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("nav-open");
      document.body.classList.remove("nav-open");
      delete document.body.dataset.scrollLock;
    };
  }, [closeDrawer, drawerOpen]);

  return (
    <>
      <nav className="desktop-nav" aria-label="Päänavigaatio">
        {siteNavigation.map((item) => (
          <NavLink key={item.href} href={item.href} label={item.label} pathname={pathname} />
        ))}
        <ButtonLink href="/yhteystiedot#yhteydenotto" className="header-cta">
          Ota yhteyttä
        </ButtonLink>
      </nav>

      <button
        ref={drawerTriggerRef}
        type="button"
        className="menu-trigger"
        aria-expanded={drawerOpen}
        aria-controls="mobile-navigation"
        aria-label="Avaa sivuston valikko"
        onClick={() => setDrawerOpen(true)}
      >
        <Icon name="menu" />
      </button>

      {drawerOpen ? (
        <div className="mobile-drawer-layer" role="presentation">
          <button
            className="mobile-drawer__overlay"
            type="button"
            aria-label="Sulje valikko"
            onClick={() => closeDrawer(true)}
          />
          <div
            ref={drawerRef}
            id="mobile-navigation"
            className="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
            tabIndex={-1}
          >
            <div className="mobile-drawer__head">
              <h2 id="mobile-menu-title">Valikko</h2>
              <button
                data-drawer-close
                type="button"
                className="icon-button"
                aria-label="Sulje valikko"
                onClick={() => closeDrawer(true)}
              >
                <Icon name="close" />
              </button>
            </div>

            <nav aria-label="Mobiilinavigaatio">
              {siteNavigation.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  pathname={pathname}
                  onNavigate={() => closeDrawer(false)}
                />
              ))}
            </nav>

            <div className="mobile-drawer__actions">
              <ButtonLink href="/yhteystiedot#yhteydenotto" className="button--full">
                Ota yhteyttä
              </ButtonLink>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
