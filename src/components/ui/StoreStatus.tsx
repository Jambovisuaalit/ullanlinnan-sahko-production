"use client";

import { useEffect, useState } from "react";

type StoreState = {
  label: string;
  detail: string;
  isOpen: boolean;
};

const defaultState: StoreState = {
  label: "Myymälä avoinna ke 10–17",
  detail: "Pietarinkatu 21",
  isOpen: false
};

function getStoreState(date: Date): StoreState {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Helsinki",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).formatToParts(date);
  const weekday = parts.find((part) => part.type === "weekday")?.value;
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? 0);
  const minutes = hour * 60 + minute;
  const isWednesday = weekday === "Wed";

  if (isWednesday && minutes >= 10 * 60 && minutes < 17 * 60) {
    return { label: "Avoinna nyt", detail: "Tänään klo 17 asti", isOpen: true };
  }

  if (isWednesday && minutes < 10 * 60) {
    return { label: "Aukeaa tänään klo 10", detail: "Pietarinkatu 21", isOpen: false };
  }

  return defaultState;
}

export function StoreStatus({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<StoreState>(defaultState);

  useEffect(() => {
    const update = () => setState(getStoreState(new Date()));
    const initialTimer = window.setTimeout(update, 0);
    const interval = window.setInterval(update, 60_000);
    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(interval);
    };
  }, []);

  return (
    <span className={`store-status ${state.isOpen ? "store-status--open" : ""} ${compact ? "store-status--compact" : ""}`}>
      <span className="store-status__dot" aria-hidden="true" />
      <span>
        <strong>{state.label}</strong>
        {!compact ? <small>{state.detail}</small> : null}
      </span>
    </span>
  );
}
