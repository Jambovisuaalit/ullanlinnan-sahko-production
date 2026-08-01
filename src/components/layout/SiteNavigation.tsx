"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  electricalNavigation,
  lightingNavigation,
  siteNavigation,
  type NavigationItem
} from "@/content/navigation";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/ButtonLink";

const DESKTOP_MEDIA_QUERY = "(min-width: 68rem)";
type DropdownId = "electrical" | "lighting" | null;

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

function groupIsActive(pathname: string, items: readonly NavigationItem[]) {
  return items.some((item) => isActive(pathname, item.href));
}

export function SiteNavigation() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<DropdownId>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const electricalRef = useRef<HTMLDivElement>(null);
  const lightingRef = useRef<HTMLDivElement>(null);
  const electricalTriggerRef = useRef<HTMLButtonElement>(null);
  const lightingTriggerRef = useRef<HTMLButtonElement>(null);
  const drawerTriggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const dropdownConfig = {
    electrical: {
      label: "Sähkötyöt",
      items: electricalNavigation,
      rootRef: electricalRef,
      triggerRef: electricalTriggerRef,
      panelId: "desktop-electrical-menu",
      triggerId: "desktop-electrical-trigger"
    },
    lighting: {
      label: "Valaisimet",
      items: lightingNavigation,
      rootRef: lightingRef,
      triggerRef: lightingTriggerRef,
      panelId: "desktop-lighting-menu",
      triggerId: "desktop-lighting-trigger"
    }
  } as const;

  function dropdownLinks(id: Exclude<DropdownId, null>) {
    const root = dropdownConfig[id].rootRef.current;
    return Array.from(root?.querySelectorAll<HTMLAnchorElement>(".nav-dropdown__panel a") ?? []);
  }

  function openDropdownAndFocus(id: Exclude<DropdownId, null>, position: "first" | "last") {
    setOpenDropdown(id);
    requestAnimationFrame(() => {
      const links = dropdownLinks(id);
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
    setOpenDropdown(null);
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    const desktopQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);

    function syncNavigationMode(event?: MediaQueryListEvent) {
      const desktop = event?.matches ?? desktopQuery.matches;
      if (desktop) setDrawerOpen(false);
      else setOpenDropdown(null);
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

  useEffect(() => {
    function onPointer(event: PointerEvent) {
      if (!openDropdown) return;
      const root = dropdownConfig[openDropdown].rootRef.current;
      if (root && !root.contains(event.target as Node)) setOpenDropdown(null);
    }

    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape" || !openDropdown) return;
      event.preventDefault();
      const trigger = dropdownConfig[openDropdown].triggerRef.current;
      setOpenDropdown(null);
      trigger?.focus();
    }

    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [openDropdown]);

  function renderDesktopDropdown(id: Exclude<DropdownId, null>) {
    const config = dropdownConfig[id];
    const active = groupIsActive(pathname, config.items);
    const isOpen = openDropdown === id;

    return (
      <div
        className="nav-dropdown"
        ref={config.rootRef}
        data-state={isOpen ? "open" : "closed"}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpenDropdown(null);
        }}
      >
        <button
          id={config.triggerId}
          ref={config.triggerRef}
          type="button"
          className={active ? "is-active" : undefined}
          data-active={active ? "true" : undefined}
          aria-expanded={isOpen}
          aria-controls={config.panelId}
          onClick={() => setOpenDropdown((value) => (value === id ? null : id))}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              openDropdownAndFocus(id, "first");
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              openDropdownAndFocus(id, "last");
            }
          }}
        >
          <span>{config.label}</span>
          {active ? <span className="sr-only">, nykyinen osio</span> : null}
          <Icon name="chevron" />
        </button>

        {isOpen ? (
          <div
            id={config.panelId}
            className="nav-dropdown__panel"
            role="region"
            aria-labelledby={config.triggerId}
            onKeyDown={(event) => {
              const links = dropdownLinks(id);
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
            {config.items.map((item) => (
              <NavLink key={item.href} {...item} onNavigate={() => setOpenDropdown(null)} />
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <>
      <nav className="desktop-nav" aria-label="Päänavigaatio">
        {renderDesktopDropdown("electrical")}
        {renderDesktopDropdown("lighting")}
        {siteNavigation.slice(2).map((item) => (
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
              <p className="mobile-nav-label">Sähkötyöt</p>
              {electricalNavigation.map((item) => (
                <NavLink key={item.href} {...item} onNavigate={() => closeDrawer(false)} />
              ))}
              <p className="mobile-nav-label">Valaisimet</p>
              {lightingNavigation.map((item) => (
                <NavLink key={item.href} {...item} onNavigate={() => closeDrawer(false)} />
              ))}
              {siteNavigation.slice(2).map((item) => (
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
