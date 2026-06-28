import { Car, Map, Star, Home, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Car,
    title: "Location de véhicules",
    description: "Flotte variée avec ou sans chauffeur, adaptée à chaque terrain.",
    href: "/services#vehicules",
  },
  {
    icon: Map,
    title: "Voyages organisés",
    description: "Visa, transport, hébergement, guide — tout est inclus.",
    href: "/trips",
  },
  {
    icon: Star,
    title: "Circuits sur mesure",
    description: "Itinéraire, budget et dates selon vos envies.",
    href: "/services#custom",
  },
  {
    icon: Home,
    title: "Hébergement",
    description: "Hôtels partenaires ou notre maison d'hôte TADART.",
    href: "/tadart",
  },
];

export default function Services() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-[var(--sienna)] font-medium">
            Ce qu'on fait
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-[var(--night)]">
            Nos services
          </h2>
        </div>

        {/* 
          CHANGED: grid-cols-2 on mobile, lg:grid-cols-4 on desktop
          sm:grid-cols-2 removed — mobile is 2-per-row, desktop is 4-per-row
        */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group relative bg-[var(--parchment)] rounded-2xl p-4 md:p-6 hover:shadow-lg hover:shadow-[var(--sienna)]/5 transition-all duration-300"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-4 right-4 md:left-6 md:right-6 h-0.5 bg-[var(--sienna)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              {/* Icon + title row */}
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white flex items-center justify-center group-hover:bg-[var(--sienna)] transition-colors duration-300">
                  <service.icon className="w-4 h-4 md:w-5 md:h-5 text-[var(--sienna)] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-[var(--night)] text-sm md:text-base leading-tight">
                  {service.title}
                </h3>
              </div>

              {/* Description — hidden on mobile (too cramped), visible on md+ */}
              <p className="hidden md:block text-sm text-gray-500 leading-relaxed pl-[52px]">
                {service.description}
              </p>

              {/* Arrow */}
              <div className="absolute top-4 right-4 md:top-6 md:right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-[var(--sienna)]" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
