import { Car, Map, Star, Home } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Car,
    title: "Location de véhicules",
    description:
      "Avec ou sans chauffeur. Flotte variée adaptée à chaque terrain, des villes aux pistes sahariennes.",
    href: "/services#vehicules",
  },
  {
    icon: Map,
    title: "Voyages organisés",
    description:
      "Visa, transport, hébergement, guide — tout est inclus. Choisissez votre destination, on fait le reste.",
    href: "/trips",
  },
  {
    icon: Star,
    title: "Circuits sur mesure",
    description:
      "Vous avez une idée de voyage ? On la concrétise. Itinéraire, budget et dates selon vos envies.",
    href: "/services#custom",
  },
  {
    icon: Home,
    title: "Hébergement",
    description:
      "Hôtels partenaires ou notre propre maison d'hôte TADART — une expérience authentique garantie.",
    href: "/tadart",
  },
];

export default function Services() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-sm uppercase tracking-widest text-[var(--sienna)] font-medium">
          Ce qu'on fait
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 text-[var(--night)]">
          Nos services
        </h2>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
          Une agence complète pour que votre voyage en Algérie soit sans stress, de A à Z.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <Link
            key={service.title}
            href={service.href}
            className="group p-6 rounded-2xl border border-gray-100 hover:border-[var(--sand)] hover:shadow-md transition-all duration-300 bg-white"
          >
            <div className="w-12 h-12 rounded-xl bg-[var(--parchment)] flex items-center justify-center mb-4 group-hover:bg-[var(--sienna)] transition-colors duration-300">
              <service.icon className="w-6 h-6 text-[var(--sienna)] group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="font-bold text-[var(--night)] text-base mb-2">
              {service.title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {service.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}