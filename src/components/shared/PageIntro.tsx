import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="page-intro">
      <nav aria-label="Ubicación">
        <Link href="/">Qatu</Link>
        <span aria-hidden="true">/</span>
        <span>{eyebrow}</span>
      </nav>
      <div className="page-intro-row">
        <div>
          <p>{eyebrow}</p>
          <h1>{title}</h1>
        </div>
        <p>{description}</p>
      </div>
    </header>
  );
}
export function PageInvite() {
  return (
    <aside className="page-invite">
      <div>
        <p>DALE A TU NEGOCIO SU PROPIO LUGAR</p>
        <h2>Tu próxima web empieza contigo.</h2>
      </div>
      <Link href="/contacto">
        Cuéntanos tu idea <ArrowUpRight size={19} />
      </Link>
    </aside>
  );
}
