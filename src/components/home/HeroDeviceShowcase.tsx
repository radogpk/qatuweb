import Image from "next/image";
import { ArrowUpRight, Smartphone } from "lucide-react";
import "./hero-device-showcase.css";

export function HeroDeviceShowcase() {
  return (
    <figure className="hero-devices-wrapper">
      <div className="hero-showcase-heading">
        <span>ASÍ PODRÍA VERSE TU NEGOCIO</span>
        <span>01 / Panadería</span>
      </div>
      <div className="devices-stage">
        <Image
          src="/hero-devices.png?v=6"
          alt="Ejemplo de diseño de La Migaja: una panadería con catálogo en computadora y celular"
          width={1680}
          height={944}
          sizes="(max-width: 900px) 100vw, 700px"
          priority
          className="devices-render-image"
        />
      </div>
      <figcaption className="hero-showcase-caption">
        <span><Smartphone size={17} aria-hidden="true" /> Tu marca, en cualquier pantalla.</span>
        <a href="#ejemplos">Explorar diseños <ArrowUpRight size={16} aria-hidden="true" /></a>
      </figcaption>
    </figure>
  );
}
