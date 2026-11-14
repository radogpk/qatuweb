import { CartItem, TenantConfig } from './tenant.config';

export interface OrderCustomerData {
  customerName: string;
  deliveryType: 'tienda' | 'delivery';
  customerAddress?: string;
  paymentMethod: string;
  cartTotal: number;
  customWhatsappOverride?: string;
}

export function buildWhatsAppUrl(
  config: TenantConfig,
  items: CartItem[],
  customer: OrderCustomerData
): string {
  const rawPhone = customer.customWhatsappOverride || config.whatsappNumber;
  const targetPhone = rawPhone.replace(/[^0-9]/g, '');

  const pickupLocation = config.pickupAddress || config.location;
  const entregaTexto =
    customer.deliveryType === 'tienda'
      ? `Recojo en local (${pickupLocation})`
      : `Delivery a domicilio (${customer.customerAddress?.trim() || 'Coordinar ubicación por GPS'})`;

  const lineasProductos = items
    .map((item) => {
      const varianteTag = item.variante ? ` (${item.variante})` : '';
      const acabadoTag = item.acabado ? ` [Color: ${item.acabado}]` : '';
      const subtotal = Number((item.precio || 0) * (item.cantidad || 1)).toFixed(2);

      let extras = '';
      if (item.detallesPersonalizados) {
        const { guarnicion, salsas, dedicatoria, velas, dni, turno, subtono } = item.detallesPersonalizados;
        const subDetails: string[] = [];
        if (guarnicion) subDetails.push(`Guarnición: ${guarnicion}`);
        if (salsas && salsas.length > 0) subDetails.push(`Salsas: ${salsas.join(', ')}`);
        if (dedicatoria) subDetails.push(`Dedicatoria: "${dedicatoria}"`);
        if (velas) subDetails.push(`Velas: ${velas}`);
        if (dni) subDetails.push(`DNI Socio: ${dni}`);
        if (turno) subDetails.push(`Turno: ${turno}`);
        if (subtono) subDetails.push(`Subtono: ${subtono}`);

        if (subDetails.length > 0) {
          extras = '\n' + subDetails.map((d) => `   - ${d}`).join('\n');
        }
      }

      return `* ${item.cantidad}x ${item.nombre}${varianteTag}${acabadoTag} -- ${config.currency} ${subtotal}${extras}`;
    })
    .join('\n\n');

  const mensaje = [
    `PEDIDO WEB -- ${config.businessName.toUpperCase()}`,
    `----------------------------------------`,
    `Cliente: ${customer.customerName.trim()}`,
    `Entrega: ${entregaTexto}`,
    `Metodo de Pago: ${customer.paymentMethod}`,
    ``,
    `DETALLE DEL PEDIDO:`,
    lineasProductos,
    `----------------------------------------`,
    `TOTAL A PAGAR: ${config.currency} ${Number(customer.cartTotal || 0).toFixed(2)}`,
    ``,
    `Pedido generado desde catalogo oficial qatuweb.com`,
  ].join('\n');

  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(mensaje)}`;
}
