"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  X,
} from "lucide-react";
import { demoCatalogs, formatSoles } from "@/lib/data/demo-catalogs";

const coverHeadlines: Record<string, string> = {
  cafe: "Un buen café. Una buena pausa.",
  flores: "Hay detalles que lo dicen todo.",
  tienda: "Pequeñas cosas. Muy tuyas.",
};

const selectDemoEvent = "qatu:select-demo";

type CatalogDemoLinkProps = {
  catalogId: string;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
};

export function CatalogDemoLink({
  catalogId,
  className,
  children,
  "aria-label": label,
}: CatalogDemoLinkProps) {
  return (
    <a
      className={className}
      href="#demo"
      aria-label={label}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
          return;
        window.dispatchEvent(
          new CustomEvent(selectDemoEvent, { detail: catalogId }),
        );
      }}
    >
      {children}
    </a>
  );
}

export function StorefrontPreview() {
  const [catalogIndex, setCatalogIndex] = useState(0);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [orderOpen, setOrderOpen] = useState(false);
  const orderButton = useRef<HTMLButtonElement>(null);
  const firstCatalogButton = useRef<HTMLButtonElement>(null);
  const catalog = demoCatalogs[catalogIndex];
  const items = catalog.products.filter(
    (product) => (quantities[product.id] || 0) > 0,
  );
  const count = items.reduce((sum, product) => sum + quantities[product.id], 0);
  const total = items.reduce(
    (sum, product) => sum + product.price * quantities[product.id],
    0,
  );

  useEffect(() => {
    function handleDemoSelection(event: Event) {
      const catalogId = (event as CustomEvent<unknown>).detail;
      if (typeof catalogId !== "string") return;
      const index = demoCatalogs.findIndex((option) => option.id === catalogId);
      if (index === -1) return;
      setCatalogIndex(index);
      setQuantities({});
      setOrderOpen(false);
    }

    window.addEventListener(selectDemoEvent, handleDemoSelection);
    return () =>
      window.removeEventListener(selectDemoEvent, handleDemoSelection);
  }, []);

  function selectCatalog(index: number) {
    if (index === catalogIndex) return;
    setCatalogIndex(index);
    setQuantities({});
    setOrderOpen(false);
  }

  function changeQuantity(id: string, change: number) {
    if (change < 0 && count === 1) setOrderOpen(false);
    setQuantities((previous) => ({
      ...previous,
      [id]: Math.max(0, Math.min(20, (previous[id] || 0) + change)),
    }));
  }

  function closeOrder() {
    setOrderOpen(false);
    orderButton.current?.focus();
  }

  const message = [
    `Hola, ${catalog.name}. Quisiera pedir:`,
    "",
    ...items.map(
      (product) =>
        `${quantities[product.id]} × ${product.name} — ${formatSoles(product.price * quantities[product.id])}`,
    ),
    "",
    `Total de productos: ${formatSoles(total)}`,
    "¿Me confirman la disponibilidad y cómo coordinar el pago y la entrega?",
  ].join("\n");

  return (
    <div className="sf-preview" id="demo">
      <div
        className="sf-tabs"
        role="group"
        aria-label="Elige el rubro de la demostración"
      >
        {demoCatalogs.map((option, index) => (
          <button
            className="sf-tab"
            ref={index === 0 ? firstCatalogButton : undefined}
            key={option.id}
            type="button"
            aria-pressed={catalogIndex === index}
            onClick={() => selectCatalog(index)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="sf-window">
        <div className="sf-address">
          <span className="sf-domain">{catalog.domain}</span>
          <span className="sf-demo-label">Demo interactiva</span>
        </div>
        <div className="sf-brand">
          <span className="sf-brand-name">
            {catalog.name}
            <span className="sf-brand-dot">.</span>
          </span>
          <span className="sf-brand-category">{catalog.label}</span>
          <ShoppingBag className="sf-brand-icon" size={18} aria-hidden="true" />
        </div>

        <div className="sf-cover">
          <Image
            className="sf-cover-image"
            src={catalog.cover}
            alt={catalog.coverAlt}
            fill
            sizes="(max-width: 700px) calc(100vw - 48px), (max-width: 1000px) 600px, 540px"
            priority={catalogIndex === 0}
          />
          <div className="sf-cover-shade" />
          <div className="sf-cover-copy">
            <span className="sf-cover-kicker">{catalog.subtitle}</span>
            <h3 className="sf-cover-title">{coverHeadlines[catalog.id]}</h3>
          </div>
        </div>

        <div className="sf-catalog-heading">
          <span className="sf-catalog-title">Nuestros favoritos</span>
          <span className="sf-catalog-hint">Toca + y arma tu pedido</span>
        </div>

        <div className="sf-products">
          {catalog.products.map((product) => {
            const quantity = quantities[product.id] || 0;
            return (
              <article className="sf-product" key={product.id}>
                <div className="sf-product-photo">
                  <Image
                    className="sf-product-image"
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 480px) 80px, 100px"
                  />
                </div>
                <div className="sf-product-info">
                  <h4 className="sf-product-name">{product.name}</h4>
                  <strong className="sf-product-price">
                    {formatSoles(product.price)}
                  </strong>
                </div>
                <div
                  className="sf-stepper"
                  role="group"
                  aria-label={`Cantidad de ${product.name}`}
                >
                  <button
                    className="sf-stepper-button"
                    type="button"
                    aria-label={`Quitar uno de ${product.name}`}
                    disabled={quantity === 0}
                    onClick={() => changeQuantity(product.id, -1)}
                  >
                    <Minus size={14} aria-hidden="true" />
                  </button>
                  <span
                    className="sf-quantity"
                    aria-label={`${quantity} unidades`}
                  >
                    {quantity}
                  </span>
                  <button
                    className="sf-stepper-button sf-stepper-add"
                    type="button"
                    aria-label={`Añadir ${product.name}`}
                    disabled={quantity === 20}
                    onClick={() => changeQuantity(product.id, 1)}
                  >
                    <Plus size={14} aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="sf-cart">
          <div className="sf-cart-summary">
            <span className="sf-cart-count">
              {count === 0
                ? "Tu pedido"
                : `${count} ${count === 1 ? "producto" : "productos"}`}
            </span>
            <strong className="sf-cart-total">{formatSoles(total)}</strong>
          </div>
          <button
            className="sf-order-button"
            ref={orderButton}
            type="button"
            disabled={count === 0}
            aria-expanded={orderOpen && count > 0}
            aria-controls="sf-order-preview"
            onClick={() => setOrderOpen((open) => !open)}
          >
            <MessageCircle size={18} aria-hidden="true" />
            Ver pedido
            <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        </div>

        <section
          className="sf-order"
          id="sf-order-preview"
          aria-labelledby="sf-order-title"
          hidden={!orderOpen || count === 0}
          onKeyDown={(event) => {
            if (event.key === "Escape") closeOrder();
          }}
        >
          <div className="sf-order-header">
            <h4 className="sf-order-title" id="sf-order-title">
              Así llegaría a tu WhatsApp
            </h4>
            <button
              className="sf-order-close"
              type="button"
              aria-label="Cerrar vista del pedido"
              onClick={closeOrder}
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>
          <p className="sf-order-message">{message}</p>
          <p className="sf-order-disclaimer">
            Vista de ejemplo. No se enviará ningún mensaje ni se realizará un
            cobro.
          </p>
          <button
            className="sf-reset-button"
            type="button"
            onClick={() => {
              setQuantities({});
              setOrderOpen(false);
              firstCatalogButton.current?.focus();
            }}
          >
            Reiniciar pedido
          </button>
        </section>
      </div>
      <p className="sf-note">
        Pruébalo: elige productos y mira cómo se prepara el pedido.
      </p>
      <p
        className="sf-status"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {catalog.label}:{" "}
        {count === 0
          ? "pedido vacío"
          : `${count} ${count === 1 ? "producto" : "productos"}, total ${formatSoles(total)}`}
        .
      </p>
    </div>
  );
}
