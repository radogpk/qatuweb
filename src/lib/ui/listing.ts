export function normalizeSearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es")
    .trim();
}
export function pageWindow(total: number, requested: number, size = 6) {
  const pages = Math.max(1, Math.ceil(total / size));
  const page = Math.min(
    pages,
    Math.max(1, Math.floor(Number.isFinite(requested) ? requested : 1)),
  );
  return {
    page,
    pages,
    start: (page - 1) * size,
    end: Math.min(page * size, total),
  };
}
