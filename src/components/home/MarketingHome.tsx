import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Globe2,
  MessageCircle,
  MoveUpRight,
  ShieldCheck,
} from "lucide-react";
import { getWhatsAppUrl } from "@/lib/config/site";
import { initialPricingPlans } from "@/lib/seed/initialBusinesses";
import { StorefrontPreview } from "./StorefrontPreview";
import { PremiumHero } from "./PremiumHero";
import { QatuPricingSection } from "./QatuPricingSection";
import "./qatu-home.css";

const questions = [
  [
    "¿Qué es Qatu y para quién es?",
    "Qatu es un servicio de diseño de páginas web y catálogos digitales para pequeños negocios en Perú. Desde Ayacucho, te ayudamos a presentar tu marca, mostrar lo que vendes y recibir consultas o pedidos en tu WhatsApp. Tú compartes tu información; nosotros diseñamos y configuramos la web.",
  ],
  [
    "¿Cuánto cuesta una página web con Qatu?",
    "Ofrecemos dos planes claros y sin sorpresas: el Plan Mensual por S/ 30 al mes (con un pago único de activación de S/ 90), y el Plan Anual Recomendado por S/ 300 al año con instalación y subida inicial totalmente GRATIS (ahorras 2 meses). Ambos cubren alojamiento, subdominio, catálogo para WhatsApp y soporte técnico.",
  ],
  [
    "¿Cómo llegan los pedidos a mi WhatsApp?",
    "En los planes de comercio, tu cliente elige productos y cantidades en el catálogo. La web prepara un resumen con el total y abre WhatsApp para que el cliente te lo envíe. Tú confirmas disponibilidad, entrega y pago directamente con él. Qatu no cobra comisión por venta.",
  ],
  [
    "¿Puedo cobrar con Yape o Plin?",
    "Sí. Los planes de comercio permiten mostrar tu QR de Yape o Plin. El cliente paga a tu cuenta y tú verificas el abono. Es una presentación de tu medio de pago; no es una pasarela con confirmación automática de pagos.",
  ],
  [
    "¿En cuánto tiempo estará lista mi web?",
    "La Web Informativa se entrega en 3 a 5 días hábiles; Comercio Básico, en 5 a 7; y Comercio + Reservas, en 7 a 10. El plazo empieza cuando recibimos las fotos, textos, precios y datos necesarios. Revisamos el diseño contigo antes de publicarlo.",
  ],
  [
    "¿Necesito saber de tecnología o estar en Ayacucho?",
    "No necesitas programar ni diseñar. Trabajamos desde Ayacucho y atendemos negocios de todo el Perú de forma remota. Nos compartes tus materiales, coordinamos los detalles contigo y te acompañamos durante la publicación y el mantenimiento.",
  ],
];

const planFeatures: Record<string, string[]> = {
  informativa: [
    "Tu marca, fotos, horarios y ubicación",
    "Dirección tunegocio.qatu.pe",
    "Botón de contacto por WhatsApp",
    "Alojamiento, seguridad y soporte",
  ],
  comercio: [
    "Todo lo de Web Informativa",
    "Catálogo de hasta 30 productos",
    "Carrito con resumen a WhatsApp",
    "Presentación de tu QR Yape o Plin",
  ],
  reservas: [
    "Todo lo de Comercio Básico",
    "Solicitud de citas o reservas",
    "Galería de servicios o ambientes",
    "Soporte prioritario",
  ],
};

export function MarketingHome() {
  return (
    <div className="q-home">
      <PremiumHero />
      <section
        className="q-container q-section p-demo-section"
        aria-labelledby="p-demo-title"
      >
        <div className="p-demo-story">
          <p className="q-eyebrow">BUEN DISEÑO. MEJOR EXPERIENCIA.</p>
          <h2 id="p-demo-title">
            De «me gusta»
            <br />
            <em>a «lo quiero».</em>
          </h2>
          <p>
            La buena impresión es solo el principio. Tus clientes encuentran lo
            que buscan, eligen sus productos y te envían un pedido claro a
            WhatsApp.
          </p>
          <ol>
            <li>
              <span>01</span> Elige un tipo de negocio.
            </li>
            <li>
              <span>02</span> Añade productos al pedido.
            </li>
            <li>
              <span>03</span> Mira el mensaje que recibirías.
            </li>
          </ol>
          <a className="q-text-link" href="#planes">
            Encuentra el plan para tu negocio <ArrowRight size={17} />
          </a>
        </div>
        <div className="q-hero-stage">
          <StorefrontPreview />
        </div>
      </section>

      <section
        className="q-journey"
        id="como-funciona"
        aria-labelledby="q-journey-title"
      >
        <div className="q-container q-section">
          <div className="q-section-head">
            <div>
              <p className="q-eyebrow">DE MIRAR A PEDIR, SIN DAR VUELTAS</p>
              <h2 id="q-journey-title">
                Menos «¿tienes fotos?».
                <br />
                <em>Más «quiero esto».</em>
              </h2>
            </div>
            <p>
              Un catálogo web que responde las primeras preguntas y deja la
              conversación importante en tus manos.
            </p>
          </div>
          <div className="q-journey-grid">
            <article>
              <div className="q-step-top">
                <span>01</span>
                <Globe2 size={24} />
              </div>
              <h3>Comparte un solo enlace.</h3>
              <p>
                Pon tu web en Instagram, en tus redes o en el QR de tu local.
                Tus fotos, precios y datos, en un mismo lugar.
              </p>
              <div className="q-url-example">
                tunegocio.qatu.pe <ArrowUpRight size={17} />
              </div>
            </article>
            <article>
              <div className="q-step-top">
                <span>02</span>
                <MessageCircle size={24} />
              </div>
              <h3>Recibe un pedido claro.</h3>
              <p>
                Tu cliente elige productos y cantidades. El catálogo prepara el
                detalle y el total para enviarlos a tu WhatsApp.
              </p>
              <div className="q-message-example">
                «¡Hola! Quiero 2 cafés de la casa.»
                <span>
                  2 × S/ 12.00 <strong>S/ 24.00</strong>
                </span>
              </div>
            </article>
            <article>
              <div className="q-step-top">
                <span>03</span>
                <ShieldCheck size={24} />
              </div>
              <h3>Tú cierras la venta.</h3>
              <p>
                Confirmas el pedido, coordinas la entrega y recibes el pago en
                tu cuenta. La relación con tu cliente sigue siendo tuya.
              </p>
              <div className="q-payment-example">
                <span>Yape</span>
                <span>Plin</span>
                <span>Transferencia</span>
              </div>
            </article>
          </div>
          <p className="q-journey-note">
            El carrito y la presentación de QR están incluidos en los planes de
            comercio. Tú verificas cada pago.
          </p>
        </div>
      </section>

      <section
        className="q-service q-section q-container"
        aria-labelledby="q-service-title"
      >
        <div className="q-service-heading">
          <p className="q-eyebrow">TÚ ATIENDES TU NEGOCIO. NOSOTROS, TU WEB.</p>
          <h2 id="q-service-title">
            No tienes que
            <br />
            <em>hacerlo todo.</em>
          </h2>
          <p>
            Qatu es un servicio de diseño web y catálogos digitales para
            negocios en Perú. Desde Ayacucho, te acompañamos desde la primera
            idea hasta la publicación.
          </p>
          <Link className="q-text-link" href="/para-tu-negocio">
            Conoce cómo trabajamos <ArrowUpRight size={17} />
          </Link>
        </div>
        <ol className="q-service-steps">
          <li>
            <span>01</span>
            <div>
              <h3>Nos cuentas qué vendes.</h3>
              <p>
                Definimos el plan y reunimos tus fotos, precios e información.
                Te orientamos sobre lo que hace falta.
              </p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>Le damos forma a tu marca.</h3>
              <p>
                Diseñamos, cargamos tu contenido y revisamos contigo cada
                detalle antes de publicar.
              </p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>Tu web lista. Y nosotros cerca.</h3>
              <p>
                Recibes tu enlace y el soporte de tu plan para mantener la web y
                actualizar la información.
              </p>
            </div>
          </li>
        </ol>
      </section>

      <QatuPricingSection />

      <section
        className="q-faq q-container q-section"
        aria-labelledby="q-faq-title"
      >
        <div>
          <p className="q-eyebrow">CONVERSÉMOSLO CLARO</p>
          <h2 id="q-faq-title">
            Buenas preguntas.
            <br />
            <em>Sin letra pequeña.</em>
          </h2>
          <Link className="q-text-link" href="/contacto">
            Tengo otra pregunta <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="q-faq-list">
          {questions.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <ChevronDown size={19} />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="q-close">
        <div className="q-container">
          <p className="q-eyebrow">DALE A TU NEGOCIO SU PROPIO LUGAR</p>
          <div className="q-close-row">
            <h2>
              Tu siguiente paso
              <br />
              <em>empieza aquí.</em>
            </h2>
            <div>
              <a
                className="q-button q-button-light"
                href={getWhatsAppUrl(
                  "Hola Qatu, quiero una web para mi negocio. Me gustaría contarles mi idea.",
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Cuéntanos tu idea <MoveUpRight size={22} />
              </a>
              <p>Hablemos por WhatsApp. Sin compromiso.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
