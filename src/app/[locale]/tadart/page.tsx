import Image from "next/image";
import Link from "next/link";
import { Home, Wifi, Coffee, Star } from "lucide-react";

const amenities = [
  { icon: Home, label: "Chambres traditionnelles" },
  { icon: Coffee, label: "Petit-déjeuner inclus" },
  { icon: Wifi, label: "Wifi disponible" },
  { icon: Star, label: "Expérience authentique" },
];

export default function TadartPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <div className="relative h-96 w-full">
        <Image
          src="/images/hero-bg.jpg"
          alt="TADART Maison d'hôte"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[var(--night)]/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="text-sm uppercase tracking-widest text-[var(--sand)] font-medium">
            Maison d'hôte
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mt-2">
            TADART
          </h1>
          <p className="text-white/70 mt-3 max-w-lg">
            Une expérience d'hébergement authentique au cœur de l'Algérie
          </p>
        </div>
      </div>

      {/* About */}
      <div className="max-w-5xl mx-auto px-6 mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-sm uppercase tracking-widest text-[var(--sienna)] font-medium">
            Notre maison
          </span>
          <h2 className="text-3xl font-bold text-[var(--night)] mt-2 leading-tight">
            L'authenticité algérienne à votre portée
          </h2>
          <div className="w-12 h-0.5 bg-[var(--sienna)] mt-4 mb-6" />
          <p className="text-gray-500 leading-relaxed">
            TADART est notre maison d'hôte traditionnelle, conçue pour offrir
            une immersion complète dans la culture et l'architecture algérienne.
            Chaque chambre est décorée avec soin, mêlant confort moderne et
            authenticité locale.
          </p>
          <p className="text-gray-500 leading-relaxed mt-4">
            Partenaire privilégié d'Enteg Voyage, TADART accueille nos
            voyageurs avec la chaleur de l'hospitalité algérienne. Un endroit
            où chaque détail raconte une histoire.
          </p>
          <Link
            href="/contact"
            className="inline-block mt-8 bg-[var(--sienna)] text-white text-sm px-8 py-3 rounded-full font-medium hover:bg-[var(--night)] transition-colors duration-300"
          >
            Réserver une chambre
          </Link>
        </div>

        <div className="relative h-80 rounded-2xl overflow-hidden">
          <Image
            src="/images/hero-bg.jpg"
            alt="TADART intérieur"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Amenities */}
      <div className="bg-[var(--parchment)] mt-16 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-[var(--night)] text-center mb-10">
            Ce qui vous attend
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {amenities.map((a) => (
              <div
                key={a.label}
                className="bg-white rounded-2xl p-6 flex flex-col items-center text-center gap-3 shadow-sm"
              >
                <a.icon className="w-8 h-8 text-[var(--sienna)]" />
                <p className="text-sm font-medium text-[var(--night)]">
                  {a.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}