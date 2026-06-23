import Link from "next/link";
import { Car, Map, Star, Home } from "lucide-react";

const services = [
  {
    id: "vehicules",
    icon: Car,
    title: "Location de véhicules",
    description:
      "Avec ou sans chauffeur. Flotte variée adaptée à chaque terrain — berlines pour les villes, 4x4 pour les pistes sahariennes. Nous assurons votre mobilité en toute sécurité.",
    features: [
      "Véhicules climatisés",
      "Chauffeurs expérimentés",
      "4x4 tout-terrain disponibles",
      "Location à la journée ou au séjour",
      "Transferts aéroport",
    ],
  },
  {
    id: "organises",
    icon: Map,
    title: "Voyages organisés",
    description:
      "De la visa jusqu'au retour, on s'occupe de tout. Choisissez votre destination parmi nos circuits et laissez-nous gérer la logistique complète de votre voyage.",
    features: [
      "Assistance visa",
      "Billets d'avion",
      "Transport sur place",
      "Hébergement inclus",
      "Guide francophone",
    ],
  },
  {
    id: "custom",
    icon: Star,
    title: "Circuits sur mesure",
    description:
      "Vous avez une idée de voyage ? On la concrétise. Itinéraire personnalisé, budget adapté et dates selon vos envies. Chaque voyage est unique.",
    features: [
      "Itinéraire personnalisé",
      "Budget sur mesure",
      "Dates flexibles",
      "Groupe ou individuel",
      "Accompagnement dédié",
    ],
  },
  {
    id: "hebergement",
    icon: Home,
    title: "Hébergement",
    description:
      "Hôtels partenaires sélectionnés ou notre propre maison d'hôte TADART. Une expérience authentique et confortable garantie à chaque étape de votre voyage.",
    features: [
      "Hôtels partenaires triés",
      "Maison d'hôte TADART",
      "Petit-déjeuner inclus",
      "Chambres traditionnelles",
      "Situations idéales",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <div className="bg-[var(--parchment)] py-16 px-6 text-center">
        <span className="text-sm uppercase tracking-widest text-[var(--sienna)] font-medium">
          Ce qu'on propose
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mt-2 text-[var(--night)]">
          Nos services
        </h1>
        <p className="text-gray-500 mt-4 max-w-xl mx-auto">
          Une agence complète pour que votre voyage en Algérie soit sans stress,
          de A à Z.
        </p>
      </div>

      {/* Services */}
      <div className="max-w-5xl mx-auto px-6 mt-16 flex flex-col gap-12">
        {services.map((service, i) => (
          <div
            key={service.id}
            id={service.id}
            className={`flex flex-col md:flex-row gap-8 items-start ${
              i % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Icon block */}
            <div className="w-full md:w-1/3 bg-[var(--parchment)] rounded-2xl p-10 flex items-center justify-center shrink-0">
              <service.icon className="w-16 h-16 text-[var(--sienna)]" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-[var(--night)]">
                {service.title}
              </h2>
              <p className="text-gray-500 mt-3 leading-relaxed">
                {service.description}
              </p>
              <ul className="mt-5 flex flex-col gap-2">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--sienna)] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-block mt-6 bg-[var(--sienna)] text-white text-sm px-6 py-3 rounded-full font-medium hover:bg-[var(--night)] transition-colors duration-300"
              >
                Demander un devis
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}