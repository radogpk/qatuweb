import Image from "next/image";
import "./hero-scroll.css";

/* ─── Business examples shown in the hero ─────────────────────────────── */
const BUSINESSES: {
  name: string;
  category: string;
  domain: string;
  image: string;
  alt: string;
}[] = [
  {
    name: "Pausa Café",
    category: "Cafetería",
    domain: "pausa.qatu.pe",
    image:
      "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=600&q=75&auto=format&fit=crop",
    alt: "Interior de cafetería con luz cálida",
  },
  {
    name: "Bloom Flores",
    category: "Florería",
    domain: "bloom.qatu.pe",
    image:
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=75",
    alt: "Arreglos florales coloridos en florero",
  },
  {
    name: "Nova Boutique",
    category: "Ropa & Accesorios",
    domain: "nova.qatu.pe",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=75&auto=format&fit=crop",
    alt: "Tienda de ropa con ropa colgada en percheros",
  },
  {
    name: "Don Fabrizio",
    category: "Barbería",
    domain: "donfabrizio.qatu.pe",
    image:
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&q=75&auto=format&fit=crop",
    alt: "Barbero trabajando en una barbería clásica",
  },
  {
    name: "La Candela",
    category: "Restaurante",
    domain: "lacandela.qatu.pe",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=75&auto=format&fit=crop",
    alt: "Platos de comida en mesa de restaurante",
  },
  {
    name: "Pão Doce",
    category: "Panadería",
    domain: "paodoce.qatu.pe",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=75&auto=format&fit=crop",
    alt: "Pan recién horneado en una panadería",
  },
  {
    name: "Verde Natural",
    category: "Tienda orgánica",
    domain: "verde.qatu.pe",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=75&auto=format&fit=crop",
    alt: "Verduras y frutas orgánicas en canastas",
  },
  {
    name: "Kiko Helados",
    category: "Heladería",
    domain: "kiko.qatu.pe",
    image:
      "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&q=75&auto=format&fit=crop",
    alt: "Helados de colores en cono",
  },
];

/* Split into two columns and duplicate for infinite loop */
const col1 = BUSINESSES.slice(0, 4);
const col2 = BUSINESSES.slice(4);

function BizCard({
  name,
  category,
  domain,
  image,
  alt,
}: (typeof BUSINESSES)[number]) {
  return (
    <div className="hero-biz-card">
      <Image src={image} alt={alt} fill unoptimized sizes="220px" />
      <div className="hero-biz-overlay" />
      <div className="hero-biz-info">
        <span className="hero-biz-category">{category}</span>
        <h3 className="hero-biz-name">{name}</h3>
        <span className="hero-biz-domain">
          <span className="hero-biz-dot" />
          {domain}
        </span>
      </div>
    </div>
  );
}

export function HeroScroll() {
  return (
    <div className="hero-scroll" aria-hidden="true">
      {/* Column 1 — scrolls up */}
      <div className="hero-scroll-col hero-scroll-col--up">
        {/* Duplicate for seamless loop */}
        {[...col1, ...col1].map((biz, i) => (
          <BizCard key={`c1-${i}`} {...biz} />
        ))}
      </div>

      {/* Column 2 — scrolls down */}
      <div className="hero-scroll-col hero-scroll-col--down">
        {[...col2, ...col2].map((biz, i) => (
          <BizCard key={`c2-${i}`} {...biz} />
        ))}
      </div>
    </div>
  );
}
