"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
export function Pagination({
  page,
  pages,
  onChange,
}: {
  page: number;
  pages: number;
  onChange: (page: number) => void;
}) {
  if (pages <= 1) return null;
  const numbers = [
    ...new Set([
      1,
      ...[page - 1, page, page + 1].filter((n) => n > 1 && n < pages),
      pages,
    ]),
  ];
  return (
    <nav className="listing-pagination" aria-label="Paginación de resultados">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        <ChevronLeft size={17} />
        Anterior
      </button>
      <div className="pagination-numbers">
        {numbers.map((n, i) => (
          <span key={n}>
            {i > 0 && n - numbers[i - 1] > 1 && (
              <span className="pagination-gap">…</span>
            )}
            <button
              type="button"
              aria-label={`Página ${n}`}
              aria-current={page === n ? "page" : undefined}
              onClick={() => onChange(n)}
            >
              {n}
            </button>
          </span>
        ))}
      </div>
      <span className="pagination-compact" aria-live="polite">
        {page} de {pages}
      </span>
      <button
        type="button"
        disabled={page === pages}
        onClick={() => onChange(page + 1)}
      >
        Siguiente
        <ChevronRight size={17} />
      </button>
    </nav>
  );
}
