import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Globe2,
  MessageCircle,
  Smartphone,
} from "lucide-react";
import { getWhatsAppUrl } from "@/lib/config/site";
import { initialPricingPlans } from "@/lib/seed/initialBusinesses";
import { demoCatalogs } from "@/lib/data/demo-catalogs";
import { ProductDemo } from "./ProductDemo";

const faqs = [
  [
    "¿Qué incluye el mantenimiento mensual?",
    "El alojamiento de tu web, el certificado de seguridad, soporte y los cambios incluidos en tu plan. En Comercio se contemplan actualizaciones mensuales de productos y precios. Acordamos contigo el alcance antes de empezar.",
  ],
  [
    "¿Puedo cambiar mis productos y precios?",
    "Sí. Nos compartes los cambios y los coordinamos según el mantenimiento de tu plan. Si necesitas ampliar el catálogo o cambiar la estructura, revisamos contigo el trabajo y el coste antes de hacerlo.",
  ],
  [
    "¿Cómo funcionan WhatsApp, Yape y Plin?",
    "Tu cliente prepara su pedido y continúa en tu WhatsApp. Tú confirmas la disponibilidad, entrega y pago. Los planes de Comercio incluyen la presentación de tu QR de Yape o Plin; Qatu no procesa ni verifica automáticamente esos pagos.",
  ],
  [
    "¿Necesito saber de tecnología o tener una web?",
    "No. Necesitamos la información de tu negocio, fotos, productos o servicios, precios y tus datos de contacto. Diseñamos tu web y la revisamos contigo antes de publicarla.",
  ],
  [
    "¿Cuánto tarda y cuánto tengo que pagar?",
    "Hay un pago único de creación y una cuota mensual, ambos visibles en los planes. El plazo es de 3 a 5 días hábiles para Web Informativa, de 5 a 7 para Comercio Básico y de 7 a 10 para Comercio + Reservas, una vez reunidos los materiales necesarios.",
  ],
  [
    "¿Qatu cobra una comisión por cada venta?",
    "Qatu no cobra comisión por tus ventas. Tus clientes se coordinan y pagan directamente contigo. Las condiciones que pueda aplicar tu proveedor de pagos son independientes del servicio de Qatu.",
  ],
];

export function MarketingHome() {
  const commerce = initialPricingPlans.find((plan) => plan.id === "comercio")!;
  return (
    <div className="marketing-home">
      <section className="marketing-hero">
        <div className="marketing-shell hero-grid">
          <div className="hero-story">
            <p className="section-kicker">WEB Y CATÁLOGO PARA TU NEGOCIO</p>
            <h1>
              Tu marca <br />
              en una web.
              <br />
              <span>
                Tus pedidos <br />
                en WhatsApp.
              </span>
            </h1>
            <p className="hero-description">
              Tus productos, precios y pedidos en un solo enlace. Diseñamos tu
              web para que tus clientes elijan y tú sigas atendiendo por
              WhatsApp.
            </p>
            <div className="hero-actions">
              <a
                className="marketing-button button-brand"
                href={getWhatsAppUrl(
                  "Hola Qatu, quiero una web con catálogo y pedidos por WhatsApp para mi negocio.",
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Quiero mi web <ArrowUpRight size={17} />
              </a>
              <a className="marketing-text-link" href="#demo">
                Probar el catálogo <ArrowRight size={16} />
              </a>
            </div>
            <p className="hero-price">
              Catálogo con pedidos desde{" "}
              <strong>S/ {commerce.monthlyPrice}/mes</strong>
              <br />
              <span>
                + S/ {commerce.setupPrice} de creación inicial. Sin comisión de
                Qatu por venta.
              </span>
            </p>
          </div>
          <ProductDemo />
        </div>
      </section>
      <div className="service-facts">
        <div className="marketing-shell">
          <span>
            <Check size={17} />
            Diseñamos y cargamos tu catálogo
          </span>
          <span>
            <Check size={17} />
            Tus clientes te contactan directamente
          </span>
          <span>
            <Check size={17} />
            Te acompañamos desde Ayacucho
          </span>
        </div>
      </div>

      <section className="marketing-section marketing-shell" id="como-funciona">
        <div className="section-heading">
          <div>
            <p className="section-kicker">
              MENOS IDAS Y VUELTAS. MÁS CLARIDAD.
            </p>
            <h2>
              Tu cliente elige.
              <br />
              Tú recibes el pedido.
            </h2>
          </div>
          <p>
            Una web que ordena lo que vendes y se conecta con la forma en que ya
            atiendes.
          </p>
        </div>
        <div className="journey-grid">
          <article>
            <span className="journey-number">01 / COMPARTE</span>
            <div className="journey-visual journey-link">
              <Globe2 size={22} />
              <span>
                tunegocio<span>.qatu.pe</span>
              </span>
              <ArrowUpRight size={20} />
            </div>
            <h3>Un enlace para todo tu negocio</h3>
            <p>
              En tu Instagram, tus estados o tu local. Tus productos, precios y
              contacto, siempre en el mismo lugar.
            </p>
          </article>
          <article>
            <span className="journey-number">02 / RECIBE</span>
            <div className="journey-visual journey-order">
              <MessageCircle size={23} />
              <div>
                <strong>2 × Café de la casa</strong>
                <span>
                  Total de productos <b>S/ 24.00</b>
                </span>
              </div>
            </div>
            <h3>El pedido llega con los detalles</h3>
            <p>
              Tu cliente elige cantidades y continúa en WhatsApp con un resumen.
              Menos preguntas repetidas sobre precios.
            </p>
          </article>
          <article>
            <span className="journey-number">03 / COORDINA</span>
            <div className="journey-visual journey-payment">
              <span>Yape</span>
              <span>Plin</span>
              <small>DIRECTO A TU NEGOCIO</small>
            </div>
            <h3>Cobras y atiendes directamente</h3>
            <p>
              Confirmas disponibilidad y entrega. Compartes tus datos de pago y
              mantienes el control de la conversación.
            </p>
          </article>
        </div>
        <p className="journey-footnote">
          El pedido de arriba es ilustrativo. Qatu no procesa pagos ni confirma
          depósitos automáticamente.
        </p>
      </section>

      <section className="examples-section" id="ejemplos">
        <div className="marketing-shell marketing-section">
          <div className="section-heading">
            <div>
              <p className="section-kicker">
                TU NEGOCIO TIENE SU PROPIA PERSONALIDAD
              </p>
              <h2>
                Tu web también
                <br />
                debería tenerla.
              </h2>
            </div>
            <p>
              Una carta para tu café. Un catálogo para tus flores. Una vitrina
              para tus productos. La estructura se adapta a lo que haces.
            </p>
          </div>
          <div className="examples-grid">
            {demoCatalogs.map((catalog, index) => (
              <article
                key={catalog.id}
                className={`example-card example-${catalog.id}`}
              >
                <div className="example-photo">
                  <Image
                    src={catalog.cover}
                    alt={catalog.coverAlt}
                    fill
                    sizes="(max-width: 700px) 90vw, 380px"
                  />
                  <span>0{index + 1}</span>
                </div>
                <div className="example-copy">
                  <span>{catalog.label.toUpperCase()} / EJEMPLO</span>
                  <h3>
                    {catalog.id === "cafe"
                      ? "Una carta que abre el apetito."
                      : catalog.id === "flores"
                        ? "Detalles que se eligen con calma."
                        : "Una vitrina abierta a tus ideas."}
                  </h3>
                  <p>
                    {catalog.id === "cafe"
                      ? "Fotos, precios y pedidos para recoger o coordinar delivery."
                      : catalog.id === "flores"
                        ? "Arreglos, opciones y una conversación para cada ocasión."
                        : "Productos organizados y un camino claro para consultarte."}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className="examples-bottom">
            <span>
              Diseños y fotografías ilustrativos. Cada web se prepara con tu
              marca y tus contenidos.
            </span>
            <a className="marketing-text-link" href="#demo">
              Cambiar de rubro en la demo <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="support-section marketing-shell marketing-section">
        <div className="support-note">
          <p>
            DETRÁS DE CADA NEGOCIO,
            <br />
            HAY ALGUIEN HACIENDO QUE PASE.
          </p>
          <h2>
            Tú ponle
            <br />
            tu esencia.
            <br />
            <span>
              Nosotros,
              <br />
              la web.
            </span>
          </h2>
          <div>
            <Smartphone size={18} />
            <span>
              Atención cercana.
              <br />
              Desde Ayacucho, para el Perú.
            </span>
          </div>
        </div>
        <div className="support-content">
          <p className="section-kicker">NO TIENES QUE HACERLO SOLO</p>
          <h2>
            De tus primeras fotos
            <br />
            al primer enlace que compartes.
          </h2>
          <div className="support-steps">
            {[
              [
                "01",
                "Nos cuentas qué necesitas",
                "Conversamos sobre tu negocio y elegimos el plan. Nos compartes tus fotos, precios y datos de contacto.",
              ],
              [
                "02",
                "Lo diseñamos contigo",
                "Preparamos tu web, cargamos tu información y revisamos el resultado contigo antes de publicarla.",
              ],
              [
                "03",
                "Publicamos y te acompañamos",
                "Te entregamos tu enlace, te sumamos al directorio y coordinamos el soporte y los cambios de tu plan.",
              ],
            ].map(([number, title, text]) => (
              <div key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/para-tu-negocio" className="marketing-text-link">
            Conocer el proceso completo <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      <section className="plans-section" id="planes">
        <div className="marketing-shell marketing-section">
          <div className="section-heading">
            <div>
              <p className="section-kicker">
                SABES LO QUE PAGAS. SABES LO QUE RECIBES.
              </p>
              <h2>
                Empieza con lo que
                <br />
                tu negocio necesita.
              </h2>
            </div>
            <p>
              Un pago para crear tu web.
              <br />
              Una mensualidad para mantenerla.
              <br />
              Cero comisiones de Qatu por venta.
            </p>
          </div>
          <div className="marketing-plans">
            {initialPricingPlans.map((plan) => (
              <article
                key={plan.id}
                className={`marketing-plan ${plan.popular ? "plan-featured" : ""}`}
              >
                <p className="plan-label">
                  {plan.id === "informativa"
                    ? "PARA QUE TE ENCUENTREN"
                    : plan.id === "comercio"
                      ? "PARA RECIBIR PEDIDOS"
                      : "PARA AGENDAR SERVICIOS"}
                </p>
                <h3>{plan.name}</h3>
                <p className="plan-description">{plan.tagline}</p>
                <div className="plan-price">
                  <span>S/</span>
                  {plan.monthlyPrice}
                  <small>/ mes</small>
                </div>
                <p className="plan-setup">
                  + S/ {plan.setupPrice} de creación inicial
                </p>
                <ul>
                  {(plan.id === "informativa"
                    ? [
                        "Web con tu identidad y dirección propia",
                        "Fotos, ubicación y horarios",
                        "Botón de contacto a WhatsApp",
                        "Soporte y cambios menores",
                      ]
                    : plan.id === "comercio"
                      ? [
                          "Todo lo de Web Informativa",
                          "Catálogo de hasta 30 productos",
                          "Carrito y resumen a WhatsApp",
                          "Presentación de tu QR Yape / Plin",
                        ]
                      : [
                          "Todo lo de Comercio Básico",
                          "Solicitud de citas o reservas",
                          "Galería de servicios o ambientes",
                          "Soporte prioritario",
                        ]
                  ).map((feature) => (
                    <li key={feature}>
                      <Check size={15} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={getWhatsAppUrl(
                    `Hola Qatu, me interesa el plan ${plan.name}. Quiero conversar sobre la web de mi negocio.`,
                  )}
                  className={`marketing-button ${plan.popular ? "button-brand" : "button-outline"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Consultar este plan <ArrowUpRight size={16} />
                </a>
                <p className="plan-delivery">Entrega: {plan.deliveryDays}</p>
              </article>
            ))}
          </div>
          <div className="plans-bottom">
            <span>
              Plazos a partir de la entrega de los materiales necesarios.
            </span>
            <Link href="/planes" className="marketing-text-link">
              Ver todos los detalles de los planes <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="marketing-faq marketing-shell marketing-section">
        <div>
          <p className="section-kicker">ANTES DE DAR EL PASO</p>
          <h2>
            Las cosas claras,
            <br />
            desde el inicio.
          </h2>
          <p>
            Si tu negocio necesita algo distinto,
            <br />
            lo conversamos contigo.
          </p>
          <Link href="/contacto" className="marketing-text-link">
            Hacer otra pregunta <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="marketing-faq-list">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <ChevronDown size={18} />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="marketing-close">
        <div className="marketing-shell">
          <div>
            <p className="section-kicker">EMPECEMOS POR TU NEGOCIO</p>
            <h2>
              Ya haces algo bueno.
              <br />
              <span>Hagamos que se vea.</span>
            </h2>
            <p>Cuéntanos qué vendes. Te ayudamos a elegir cómo mostrarlo.</p>
          </div>
          <div>
            <a
              className="marketing-button button-brand"
              href={getWhatsAppUrl(
                "Hola Qatu, quiero conversar sobre una web para mi negocio. Me gustaría conocer qué plan me conviene.",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} />
              Conversemos por WhatsApp <ArrowUpRight size={17} />
            </a>
            <span>Sin formularios largos. Sin compromiso.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
