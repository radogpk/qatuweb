import Image from "next/image";
import { Quote, Star } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Antes mandábamos fotos desordenadas por WhatsApp y perdíamos mucho tiempo respondiendo precios uno a uno. Con nuestro subdominio lasflores.qatu.pe, los clientes eligen su ramo y nos llega el pedido listo.",
      author: "Rosa Gutiérrez",
      role: "Propietaria",
      business: "Florería Las Flores (Ayacucho)",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
    },
    {
      quote: "Para Hotel Umaru era vital tener una web rápida, con fotos elegantes de las habitaciones coloniales y reservas directas sin pagar las comisiones excesivas de plataformas internacionales.",
      author: "Carlos Mendoza",
      role: "Administrador",
      business: "Hotel Umaru Ayacucho",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section className="py-20 bg-[#F5EFE4] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B23A2E]">
            Prueba Social
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2B3A55]">
            La experiencia de nuestros primeros negocios
          </h2>
          <p className="text-sm text-[#4A5B78]">
            Casos reales de emprendedores peruanos que ya operan con su propio subdominio en Qatu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-[#E8DEC8] shadow-warm flex flex-col justify-between relative"
            >
              <Quote className="w-10 h-10 text-[#D4A017]/20 absolute top-6 right-6" />

              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[#D4A017]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-[#2B3A55] italic leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-[#E8DEC8] flex items-center gap-4 mt-6">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#D4A017]">
                  <Image
                    src={item.avatar}
                    alt={item.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#2B3A55]">
                    {item.author}
                  </h4>
                  <p className="text-xs text-[#4A5B78]">
                    {item.role} · <span className="font-semibold text-[#B23A2E]">{item.business}</span>
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
