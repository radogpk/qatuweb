"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Globe2,
  MessageCircle,
  Minus,
  Plus,
  RotateCcw,
  ShoppingBag,
} from "lucide-react";
import { demoCatalogs, formatSoles } from "@/lib/data/demo-catalogs";

export function ProductDemo() {
  const [catalogIndex, setCatalogIndex] = useState(0);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [view, setView] = useState<"catalog" | "order">("catalog");
  const orderTitle = useRef<HTMLHeadingElement>(null);
  const catalogTitle = useRef<HTMLHeadingElement>(null);
  const catalog = demoCatalogs[catalogIndex];
  const items = catalog.products.filter(
    (product) => quantities[product.id] > 0,
  );
  const count = items.reduce((sum, product) => sum + quantities[product.id], 0);
  const total = items.reduce(
    (sum, product) => sum + product.price * quantities[product.id],
    0,
  );

  function updateQuantity(id: string, change: number) {
    setQuantities((previous) => ({
      ...previous,
      [id]: Math.max(0, Math.min(20, (previous[id] || 0) + change)),
    }));
  }

  function changeView(next: "catalog" | "order") {
    setView(next);
    requestAnimationFrame(() =>
      (next === "order" ? orderTitle : catalogTitle).current?.focus({
        preventScroll: true,
      }),
    );
  }

  return (
    <div className="product-demo" id="demo">
      <div className="demo-toolbar">
        <span className="demo-toolbar-label">PRUEBA UN EJEMPLO</span>
        <div
          className="demo-switcher"
          role="group"
          aria-label="Tipo de negocio de la demostración"
        >
          {demoCatalogs.map((item, index) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={catalogIndex === index}
              onClick={() => {
                setCatalogIndex(index);
                setQuantities({});
                setView("catalog");
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div
        className={`demo-window ${view === "order" ? "demo-window-order" : ""}`}
      >
        <div className="demo-address">
          <div className="demo-address-dots">
            <span />
            <span />
            <span />
          </div>
          <span className="demo-address-url">
            <Globe2 size={11} />
            {catalog.domain}
          </span>
          <span className="demo-address-tag">DEMO</span>
        </div>
        {view === "catalog" ? (
          <div className="demo-catalog">
            <div className="demo-cover">
              <Image
                src={catalog.cover}
                alt={catalog.coverAlt}
                fill
                priority
                unoptimized
                sizes="(max-width: 760px) 95vw, 450px"
              />
              <div className="demo-cover-shade" />
              <div className="demo-store-name">
                <p>{catalog.subtitle}</p>
                <h2 ref={catalogTitle} tabIndex={-1}>
                  {catalog.name}
                  <span>.</span>
                </h2>
                <span>Hecho con cuidado. Elegido por ti.</span>
              </div>
            </div>
            <div className="demo-catalog-body">
              <div className="demo-catalog-heading">
                <h3>Elige algo para ti</h3>
                <span>Catálogo de ejemplo</span>
              </div>
              <div className="demo-products">
                {catalog.products.map((product) => {
                  const quantity = quantities[product.id] || 0;
                  return (
                    <article className="demo-product" key={product.id}>
                      <div className="demo-product-photo">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          unoptimized
                          sizes="80px"
                        />
                      </div>
                      <div className="demo-product-copy">
                        <h4>{product.name}</h4>
                        <p>{product.detail}</p>
                        <strong>{formatSoles(product.price)}</strong>
                      </div>
                      <div className="demo-quantity">
                        {quantity > 0 && (
                          <>
                            <button
                              type="button"
                              aria-label={`Quitar una unidad de ${product.name}`}
                              onClick={() => updateQuantity(product.id, -1)}
                            >
                              <Minus size={14} />
                            </button>
                            <span aria-label={`${quantity} unidades`}>
                              {quantity}
                            </span>
                          </>
                        )}
                        <button
                          type="button"
                          className="demo-add"
                          aria-label={`Añadir ${product.name}`}
                          disabled={quantity >= 20}
                          onClick={() => updateQuantity(product.id, 1)}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
              <div className="demo-cart" aria-live="polite" aria-atomic="true">
                <span>
                  <ShoppingBag size={16} />
                  {count
                    ? `${count} ${count === 1 ? "producto" : "productos"}`
                    : "Añade un producto para probar"}
                </span>
                <strong>{formatSoles(total)}</strong>
              </div>
              <button
                type="button"
                className="demo-order-button"
                disabled={count === 0}
                onClick={() => changeView("order")}
              >
                <MessageCircle size={17} />
                <span>Ver pedido para WhatsApp</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        ) : (
          <div className="demo-order-preview">
            <div className="demo-order-header">
              <button
                type="button"
                aria-label="Volver al catálogo"
                onClick={() => changeView("catalog")}
              >
                <ArrowLeft size={18} />
              </button>
              <div>
                <h2 ref={orderTitle} tabIndex={-1}>
                  Así te llegaría el pedido
                </h2>
                <p>Vista previa de WhatsApp</p>
              </div>
              <MessageCircle size={24} />
            </div>
            <div className="demo-chat">
              <div className="demo-message">
                <p>Hola, {catalog.name}. Quisiera hacer este pedido:</p>
                <ul>
                  {items.map((product) => (
                    <li key={product.id}>
                      <span>
                        {quantities[product.id]} × {product.name}
                      </span>
                      <strong>
                        {formatSoles(product.price * quantities[product.id])}
                      </strong>
                    </li>
                  ))}
                </ul>
                <div className="demo-message-total">
                  <span>Total de productos</span>
                  <strong>{formatSoles(total)}</strong>
                </div>
                <p>
                  ¿Me confirmas la disponibilidad y cómo coordinar la entrega y
                  el pago?
                </p>
                <small>
                  Mensaje de ejemplo <Check size={12} />
                </small>
              </div>
            </div>
            <div className="demo-order-explainer">
              <h3>La conversación sigue contigo.</h3>
              <p>
                Confirmas disponibilidad, entrega y cobro con tu cliente. Puedes
                compartir tu Yape o Plin directamente.
              </p>
              <span>
                Esta demostración no envía mensajes ni realiza cobros.
              </span>
            </div>
            <div className="demo-order-actions">
              <button type="button" onClick={() => changeView("catalog")}>
                <ArrowLeft size={15} />
                Editar pedido
              </button>
              <button
                type="button"
                onClick={() => {
                  setQuantities({});
                  changeView("catalog");
                }}
              >
                <RotateCcw size={14} />
                Empezar de nuevo
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="demo-caption">
        <span>
          <ChevronRight size={14} />
          {view === "catalog"
            ? "Toca + y descubre el recorrido de un pedido."
            : "Del catálogo a una conversación. Sin intermediarios."}
        </span>
        <span>Ejemplo ilustrativo</span>
      </div>
    </div>
  );
}
