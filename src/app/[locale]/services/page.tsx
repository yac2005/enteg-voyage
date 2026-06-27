import Link from "next/link";
import Image from "next/image";

const services = [
  {
    id: "vehicules",
    image: "/images/services/vehicules.jpg",
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
    image: "/images/services/organises.jpg",
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
    image: "/images/services/custom.jpg",
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
    image: "/images/services/hebergement.jpg",
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
        <span className="text-xs uppercase tracking-[0.2em] text-[var(--sienna)] font-medium">
          Ce qu'on propose
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mt-3 text-[var(--night)]">
          Nos services
        </h1>
        <p className="text-gray-400 mt-4 max-w-lg mx-auto leading-relaxed">
          Une agence complète pour que votre voyage en Algérie soit sans stress, de A à Z.
        </p>
      </div>

      {/* Services */}
      <div className="max-w-6xl mx-auto px-6 mt-20 flex flex-col gap-20">
        {services.map((service, i) => (
          <div
            key={service.id}
            id={service.id}
            className={`flex flex-col md:flex-row gap-10 items-center ${
              i % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div className="w-full md:w-2/5 aspect-[4/3] relative rounded-2xl overflow-hidden shadow-lg shrink-0">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--night)]">
                {service.title}
              </h2>
              <p className="text-gray-500 mt-4 leading-relaxed text-base">
                {service.description}
              </p>
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <span className="w-2 h-2 rounded-full bg-[var(--sienna)] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-block mt-8 bg-[var(--sienna)] text-white text-sm px-8 py-3.5 rounded-full font-semibold hover:bg-[var(--night)] transition-colors duration-300 shadow-lg shadow-[var(--sienna)]/20"
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