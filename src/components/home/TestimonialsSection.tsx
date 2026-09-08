import Image from "next/image";
import { Quote, Star, Sparkles } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Antes mandábamos fotos desordenadas por WhatsApp y perdíamos mucho tiempo respondiendo precios uno a uno. Con nuestro subdominio lasflores.qatu.pe, los clientes eligen su ramo y nos llega el pedido listo con dirección y dedicatoria.",
      author: "Rosa Gutiérrez",
      role: "Propietaria",
      business: "Florería Las Flores (Ayacucho)",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
      rating: 5,
    },
    {
      quote: "Para Hotel Umaru era vital tener una web rápida, con fotos elegantes de las habitaciones coloniales y reservas directas por WhatsApp sin pagar las comisiones abusivas del 18% de plataformas internacionales.",
      author: "Carlos Mendoza",
      role: "Administrador",
      business: "Hotel Umaru Ayacucho",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Historias Reales de Éxito</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            La experiencia de nuestros negocios piloto
          </h2>
          <p className="text-base text-slate-600">
            Casos reales de emprendedores y empresas que ya transformaron sus ventas con Qatu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 rounded-2xl p-8 border border-slate-200 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between relative group hover:bg-white"
            >
              <Quote className="w-10 h-10 text-slate-200 group-hover:text-brand-200 transition-colors absolute top-6 right-6" />

              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200 flex items-center gap-4 mt-6">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-brand-500 shrink-0 shadow-xs">
                  <Image
                    src={item.avatar}
                    alt={item.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-slate-900">
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
