import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Store, HeartHandshake, ShieldCheck, MapPin, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre Qatu — Quiénes Somos y Nuestra Misión",
  description:
    "Conoce la historia detrás de Qatu.pe: un equipo nacido en Ayacucho comprometido con democratizar la presencia digital para los negocios peruanos sin fricciones técnicas.",
};

export default function NosotrosPage() {
  const team = [
    {
      name: "Luis Quispe",
      role: "Co-fundador & Producto",
      bio: "Apasionado por la tecnología aplicada al desarrollo regional. Diseña la experiencia de Qatu para que ningún dueño de negocio tenga miedo de digitalizarse.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    },
    {
      name: "Renato Palomino",
      role: "Co-fundador & Desarrollo Web",
      bio: "Ingeniero de software con foco en plataformas rápidas, arquitectura en la nube y subdominios optimizados para cargar en cualquier rincón del país.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    },
    {
      name: "Sofía Medina",
      role: "Co-fundadora & Relaciones Comerciales",
      bio: "Especialista en atención al cliente y gestión de comercios locales en Ayacucho. Acompaña a cada dueño de negocio en su proceso de onboarding paso a paso.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
    },
  ];

  const values = [
    {
      icon: HeartHandshake,
      title: "Cercanía humana real",
      desc: "No somos un software anónimo ni un chatbot automático. Hablas con personas de verdad que van a tu local o te responden en minutos por WhatsApp.",
    },
    {
      icon: Store,
      title: "Identidad y orgullo local",
      desc: "Qatu significa 'mercado' en quechua. Diseñamos para celebrar el trabajo de los negocios de Ayacucho y del Perú, respetando su identidad y valores.",
    },
    {
      icon: ShieldCheck,
      title: "Transparencia sin comisiones",
      desc: "No cobramos porcentajes sobre lo que vendes. Tu negocio crece con su propio esfuerzo; nosotros cobramos una tarifa justa por el servicio técnico.",
    },
  ];

  return (
    <div className="py-12 sm:py-16 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B23A2E]">
            Nuestra Historia y Propósito
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1E2838] tracking-tight">
            Nacidos en Ayacucho para conectar el comercio peruano
          </h1>
          <p className="text-sm sm:text-base text-[#4B586E] leading-relaxed">
            Qatu nació con una convicción clara: todo negocio local honesto y trabajador merece tener una presencia web moderna y profesional, sin pagar miles de soles ni lidiar con tecnicismos incomprensibles.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#EAE6DF] shadow-card space-y-6">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E2838]">
              ¿Por qué existe Qatu?
            </h2>
            <p className="text-sm sm:text-base text-[#4B586E] leading-relaxed">
              Caminando por las calles del centro histórico de Huamanga, nos dimos cuenta de que cientos de florerías, hoteles boutique, talleres artesanales y restaurantes tenían productos de calidad excepcional, pero su presencia digital se limitaba a una página de Facebook abandonada o fotos sueltas en estados de WhatsApp.
            </p>
            <p className="text-sm sm:text-base text-[#4B586E] leading-relaxed">
              Crear una página web convencional costaba demasiado caro, tardaba meses y requería contratar a un programador cada vez que cambiaba un precio. En el otro extremo, las plataformas extranjeras cobraban comisiones agresivas sobre cada pedido.
            </p>
            <p className="text-sm sm:text-base text-[#1E2838] font-semibold leading-relaxed">
              Por eso creamos Qatu: una infraestructura compartida donde cada negocio tiene su propio subdominio independiente, una vitrina impecable y un equipo que lo respalda todos los días.
            </p>
          </div>

          <div className="pt-4 flex items-center gap-2 text-xs sm:text-sm text-[#C59218] font-semibold">
            <MapPin className="w-4 h-4 text-[#B23A2E]" />
            <span>Sede en Huamanga, Ayacucho — Atendiendo negocios en todo el Perú</span>
          </div>
        </div>

        {/* Values Section */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B23A2E]">
              Nuestros Pilares
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E2838]">
              Cómo trabajamos cada día
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EAE6DF] shadow-subtle hover:shadow-card transition-all space-y-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#FCF8EC] text-[#C59218] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#1E2838]">
                    {v.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4B586E] leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B23A2E]">
              El Equipo Detrás
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E2838]">
              Personas reales, soporte directo
            </h2>
            <p className="text-sm text-[#4B586E]">
              Somos un equipo de 3 profesionales dedicados a construir la infraestructura digital para el crecimiento de tu negocio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-[#EAE6DF] shadow-card flex flex-col items-center text-center space-y-4"
              >
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#EAE6DF] shadow-xs">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-lg text-[#1E2838]">
                    {member.name}
                  </h3>
                  <span className="text-xs font-semibold text-[#B23A2E] block">
                    {member.role}
                  </span>
                </div>
                <p className="text-xs text-[#4B586E] leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-white rounded-2xl p-8 border border-[#EAE6DF] shadow-card text-center space-y-4 max-w-3xl mx-auto">
          <h3 className="text-2xl font-serif font-bold text-[#1E2838]">
            ¿Quieres conocer más sobre el proyecto o tomar un café con nosotros?
          </h3>
          <p className="text-xs sm:text-sm text-[#4B586E]">
            Estamos siempre abiertos a conversar con comerciantes, artesanos y emprendedores de la región.
          </p>
          <div className="pt-2">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#B23A2E] hover:bg-[#962E24] text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              <span>Escríbenos directamente</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
