"use client";
import { useEffect, useState } from "react";
export function useListingQuery() {
  const [query, setQuery] = useState<URLSearchParams>(
    () => new URLSearchParams(),
  );
  useEffect(() => {
    const sync = () => setQuery(new URLSearchParams(window.location.search));
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  function update(values: Record<string, string>, push = false) {
    const next = new URLSearchParams(window.location.search);
    Object.entries(values).forEach(([key, value]) =>
      value ? next.set(key, value) : next.delete(key),
    );
    const url =
      window.location.pathname +
      (next.size ? `?${next}` : "") +
      window.location.hash;
    if (push) window.history.pushState(null, "", url);
    else window.history.replaceState(null, "", url);
    setQuery(next);
  }
  return { query, update };
}
