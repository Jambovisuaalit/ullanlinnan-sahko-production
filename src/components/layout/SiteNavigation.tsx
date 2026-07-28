"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { serviceNavigation, siteNavigation } from "@/content/navigation";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/ButtonLink";

const DESKTOP_MEDIA_QUERY = "(min-width: 68rem)";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({ href, label, onNavigate }: { href: string; label: string; onNavigate?: () => void }) {
  const pathname = usePathname();
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTriggerRef = useRef<HTMLButtonElement>(null);
  const drawerTriggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  function dropdownLinks() {
    return Array.from(dropdownRef.current?.querySelectorAll<HTMLAnchorElement>(".nav-dropdown__panel a") ?? []);
  }

  function openDropdownAndFocus(position: "first" | "last") {
    setDropdownOpen(true);
    requestAnimationFrame(() => {
      const links = dropdownLinks();
      (position === "first" ? links[0] : links.at(-1))?.focus();
    });
  }

  const closeDrawer = useCallback((restoreFocus = true) => {
    setDrawerOpen(false);
    if (restoreFocus) {
      requestAnimationFrame(() => drawerTriggerRef.current?.focus());
    }
  }, []);

  useEffect(() => {
    setDropdownOpen(false);
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    const desktopQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);

    function syncNavigationMode(event?: MediaQueryListEvent) {
      const desktop = event?.matches ?? desktopQuery.matches;
      if (desktop) setDrawerOpen(false);
      else setDropdownOpen(false);
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
        root!.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
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

  useEffect(() => {
    function onPointer(event: PointerEvent) {
      if (dropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape" && dropdownOpen) {
        event.preventDefault();
        setDropdownOpen(false);
        dropdownTriggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [dropdownOpen]);

  const serviceActive = serviceNavigation.some((item) => isActive(pathname, item.href));

  return (
    <>
      <nav className="desktop-nav" aria-label="Päänavigaatio">
        <div
          className="nav-dropdown"
          ref={dropdownRef}
          data-state={dropdownOpen ? "open" : "closed"}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setDropdownOpen(false);
            }
          }}
        >
          <button
            id="desktop-service-trigger"
            ref={dropdownTriggerRef}
            type="button"
            className={serviceActive ? "is-active" : undefined}
            data-active={serviceActive ? "true" : undefined}
            aria-expanded={dropdownOpen}
            aria-controls="desktop-service-menu"
            onClick={() => setDropdownOpen((value) => !value)}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                openDropdownAndFocus("first");
              } else if (event.key === "ArrowUp") {
                event.preventDefault();
                openDropdownAndFocus("last");
              }
            }}
          >
            <span>Palvelut</span>
            {serviceActive ? <span className="sr-only">, nykyinen osio</span> : null}
            <Icon name="chevron" />
          </button>

          {dropdownOpen ? (
            <div
              id="desktop-service-menu"
              className="nav-dropdown__panel"
              role="region"
              aria-labelledby="desktop-service-trigger"
              onKeyDown={(event) => {
                const links = dropdownLinks();
                const currentIndex = links.indexOf(document.activeElement as HTMLAnchorElement);

                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  links[(currentIndex + 1 + links.length) % links.length]?.focus();
                } else if (event.key === "ArrowUp") {
                  event.preventDefault();
                  links[(currentIndex - 1 + links.length) % links.length]?.focus();
                } else if (event.key === "Home") {
                  event.preventDefault();
                  links[0]?.focus();
                } else if (event.key === "End") {
                  event.preventDefault();
                  links.at(-1)?.focus();
                }
              }}
            >
              {serviceNavigation.map((item) => (
                <NavLink key={item.href} {...item} onNavigate={() => setDropdownOpen(false)} />
              ))}
            </div>
          ) : null}
        </div>

        {siteNavigation.slice(1).map((item) => (
          <NavLink key={item.href} href={item.href} label={item.label} />
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
              <p className="mobile-nav-label">Palvelut</p>
              {serviceNavigation.map((item) => (
                <NavLink key={item.href} {...item} onNavigate={() => closeDrawer(false)} />
              ))}
              {siteNavigation.slice(1).map((item) => (
                <NavLink key={item.href} href={item.href} label={item.label} onNavigate={() => closeDrawer(false)} />
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
