"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Battery,
  CheckCheck,
  Lock,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Wifi,
} from "lucide-react";
import { demoCatalogs, formatSoles } from "@/lib/data/demo-catalogs";

export function ProductDemo() {
  const [catalogIndex, setCatalogIndex] = useState(0);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const catalog = demoCatalogs[catalogIndex];

  const items = catalog.products.filter(
    (product) => (quantities[product.id] || 0) > 0,
  );
  const count = items.reduce(
    (sum, product) => sum + (quantities[product.id] || 0),
    0,
  );
  const total = items.reduce(
    (sum, product) => sum + product.price * (quantities[product.id] || 0),
    0,
  );

  function updateQuantity(id: string, change: number) {
    setQuantities((previous) => ({
      ...previous,
      [id]: Math.max(0, Math.min(20, (previous[id] || 0) + change)),
    }));
  }

  return (
    <div className="product-demo" id="demo">
      {/* Smartphone Mockup */}
      <div className="phone-showcase-container">
        {/* Phone chassis */}
        <div className="smartphone-mockup">
          {/* Top bezel & Dynamic Island */}
          <div className="phone-island-container">
            <span className="phone-clock">9:41</span>
            <div className="phone-island" />
            <div className="phone-status-icons">
              <Wifi size={11} />
              <Battery size={13} />
            </div>
          </div>

          {/* In-phone Browser Address Bar */}
          <div className="phone-browser-bar">
            <div className="phone-url-pill">
              <Lock size={10} className="phone-lock-icon" />
              <span>{catalog.domain}</span>
            </div>
            <span className="phone-live-tag">EN VIVO</span>
          </div>

          {/* Phone Screen Content */}
          <div className="phone-screen-content">
            {/* Store Banner */}
            <div className="phone-cover">
              <Image
                src={catalog.cover}
                alt={catalog.coverAlt}
                fill
                priority
                unoptimized
                sizes="340px"
              />
              <div className="phone-cover-overlay" />
              <div className="phone-cover-text">
                <span className="phone-store-kicker">{catalog.subtitle}</span>
                <h3 className="phone-store-name">{catalog.name}.</h3>
              </div>
            </div>

            {/* Products List */}
            <div className="phone-catalog-body">
              <div className="phone-catalog-header">
                <span>Catálogo del local</span>
                <span>Toca + para pedir</span>
              </div>

              <div className="phone-products-list">
                {catalog.products.map((product) => {
                  const quantity = quantities[product.id] || 0;
                  return (
                    <article className="phone-product-card" key={product.id}>
                      <div className="phone-product-img">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          unoptimized
                          sizes="60px"
                        />
                      </div>
                      <div className="phone-product-info">
                        <h4>{product.name}</h4>
                        <p>{product.detail}</p>
                        <strong>{formatSoles(product.price)}</strong>
                      </div>
                      <div className="phone-product-stepper">
                        {quantity > 0 && (
                          <>
                            <button
                              type="button"
                              aria-label={`Quitar uno de ${product.name}`}
                              onClick={() => updateQuantity(product.id, -1)}
                            >
                              <Minus size={12} />
                            </button>
                            <span>{quantity}</span>
                          </>
                        )}
                        <button
                          type="button"
                          className="stepper-add-btn"
                          aria-label={`Añadir ${product.name}`}
                          onClick={() => updateQuantity(product.id, 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* In-phone cart preview */}
              <div className="phone-cart-summary">
                <div className="phone-cart-text">
                  <ShoppingBag size={13} />
                  <span>
                    {count
                      ? `${count} ${count === 1 ? "producto" : "productos"}`
                      : "Catálogo disponible"}
                  </span>
                </div>
                <strong>{formatSoles(total)}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Category switcher — below phone, centered */}
        <div className="demo-switcher-row">
          <span className="demo-toolbar-label">Elige un rubro</span>
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
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* WhatsApp Live Order Card — below the phone, full width of demo area */}
      <div className="whatsapp-floating-card">
        <div className="wa-card-header">
          <div className="wa-brand">
            <div className="wa-icon-badge">
              <MessageCircle size={15} />
            </div>
            <div>
              <span className="wa-title">WhatsApp de tu negocio</span>
              <span className="wa-status">● Pedido directo</span>
            </div>
          </div>
          <span className="wa-timestamp">Ahora</span>
        </div>

        <div className="wa-card-bubble">
          <p className="wa-greeting">
            ¡Hola {catalog.name}! 👋 Quiero realizar este pedido desde su web:
          </p>

          {count > 0 ? (
            <div className="wa-order-breakdown">
              <ul className="wa-items-list">
                {items.map((product) => (
                  <li key={product.id}>
                    <span>
                      {quantities[product.id]}× {product.name}
                    </span>
                    <strong>
                      {formatSoles(product.price * quantities[product.id])}
                    </strong>
                  </li>
                ))}
              </ul>
              <div className="wa-total-line">
                <span>Total a pagar:</span>
                <strong>{formatSoles(total)}</strong>
              </div>
              <div className="wa-payment-badge">
                <span>Coordinar entrega y pago Yape / Plin</span>
              </div>
            </div>
          ) : (
            <div className="wa-empty-hint">
              <span>
                👆 Toca el botón <strong>+</strong> en el celular para armar tu pedido de prueba.
              </span>
            </div>
          )}

          <div className="wa-bubble-footer">
            <span className="wa-time-sent">12:30 p. m.</span>
            <CheckCheck size={14} className="wa-check-icon" />
          </div>
        </div>

        <div className="wa-card-footer">
          <span className="wa-footer-note">
            Tus clientes eligen en la web, tú atiendes y cobras en WhatsApp.
          </span>
        </div>
      </div>
    </div>
  );
}
