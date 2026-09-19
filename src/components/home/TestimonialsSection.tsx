import Image from "next/image";
import { Quote, Star, ExternalLink } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Antes mandábamos fotos desordenadas por WhatsApp y perdíamos mucho tiempo respondiendo precios uno a uno. Con nuestro subdominio lasflores.qatu.pe, los clientes eligen su ramo y nos llega el pedido listo con dirección y dedicatoria.",
      author: "Rosa Gutiérrez",
      role: "Propietaria",
      business: "Florería Las Flores (Ayacucho)",
      subdomain: "lasflores.qatu.pe",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
      rating: 5,
    },
    {
      quote: "Para Hotel Umaru era vital tener una web rápida, con fotos elegantes de las habitaciones coloniales y reservas directas por WhatsApp sin pagar las comisiones abusivas del 18% de plataformas internacionales.",
      author: "Carlos Mendoza",
      role: "Administrador",
      business: "Hotel Umaru Ayacucho",
      subdomain: "hotelumaru.qatu.pe",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 md:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block mb-1.5">
            Historias reales
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            La experiencia de nuestros negocios piloto
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Emprendedores y empresarios locales que convirtieron su presencia en internet en un canal de ventas diario.
          </p>
        </div>

        {/* 2 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between relative group"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <a
                    href={`https://${item.subdomain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-slate-500 hover:text-brand-600 transition-colors"
                  >
                    <span>{item.subdomain}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <p className="text-base text-slate-700 leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center gap-4 mt-8">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-brand-500 shrink-0 shadow-xs">
                  <Image
                    src={item.avatar}
                    alt={item.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-slate-900">
                    {item.author}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {item.role} · <span className="font-bold text-brand-600">{item.business}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
