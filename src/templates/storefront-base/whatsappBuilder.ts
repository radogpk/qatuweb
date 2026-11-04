import { CartItem, TenantConfig } from './tenant.config';

export interface OrderCustomerData {
  customerName: string;
  deliveryType: 'tienda' | 'delivery';
  customerAddress?: string;
  paymentMethod: string;
  cartTotal: number;
  customWhatsappOverride?: string; // Para demos en vivo en la calle
}

export function buildWhatsAppUrl(
  config: TenantConfig,
  items: CartItem[],
  customer: OrderCustomerData
): string {
  // Número de destino: si el vendedor puso el número del prospecto en vivo, usar ese; sino el oficial
  const rawPhone = customer.customWhatsappOverride || config.whatsappNumber;
  const targetPhone = rawPhone.replace(/[^0-9]/g, '');

  const entregaTexto =
    customer.deliveryType === 'tienda'
      ? `Recojo en tienda (${config.location})`
      : `Delivery (${customer.customerAddress || 'Coordinar ubicación exacta'})`;

  const lineasProductos = items
    .map((item) => {
      const varianteTag =
        config.features.enableVariants && item.variante
          ? ` (${config.features.variantLabel}: ${item.variante})`
          : '';
      const subtotal = (item.precio * item.cantidad).toFixed(2);
      return `• ${item.cantidad}x ${item.nombre}${varianteTag} — ${config.currency} ${subtotal}`;
    })
    .join('\n');

  const mensaje = [
    `🛍️ *NUEVO PEDIDO WEB - ${config.businessName.toUpperCase()}*`,
    `──────────────────────────────`,
    `👤 *Cliente:* ${customer.customerName}`,
    `📍 *Entrega:* ${entregaTexto}`,
    `💳 *Pago con:* ${customer.paymentMethod}`,
    ``,
    `*DETALLE DEL PEDIDO:*`,
    lineasProductos,
    `──────────────────────────────`,
    `💰 *TOTAL A PAGAR: ${config.currency} ${customer.cartTotal.toFixed(2)}*`,
    ``,
    `🌐 _Pedido generado desde ${config.slug}.qatuweb.com_`,
    `⚡ _Tecnología por QatuWeb.com_`,
  ].join('\n');

  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(mensaje)}`;
}
