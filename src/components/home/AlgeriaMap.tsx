"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const regions = [
  {
    id: "djanet",
    name: "Djanet & Tassili",
    description: "Paysages lunaires et gravures rupestres millénaires.",
    image: "/images/destinations/djanet.jpg",
    href: "/destinations/djanet",
    // percentage positions on the PNG (left%, top%)
    x: 75,
    y: 54,
  },
  {
    id: "taghit",
    name: "Taghit & Béchar",
    description: "Dunes dorées et palmeraie au cœur du désert.",
    image: "/images/destinations/taghit.jpg",
    href: "/destinations/taghit",
    x: 35,
    y: 36,
  },
  {
    id: "ghardaia",
    name: "Ghardaïa & M'Zab",
    description: "Architecture mozabite classée UNESCO.",
    image: "/images/destinations/ghardaia.jpg",
    href: "/destinations/ghardaia",
    x: 56,
    y: 32,
  },
  {
    id: "oran",
    name: "Oran",
    description: "Ville cosmopolite au bord de la Méditerranée.",
    image: "/images/destinations/oran.jpg",
    href: "/destinations/oran",
    x: 42,
    y: 15,
  },
  {
    id: "constantine",
    name: "Constantine",
    description: "La ville des ponts suspendus sur ses falaises.",
    image: "/images/destinations/constantine.jpg",
    href: "/destinations/constantine",
    x: 60,
    y: 10,
  },
  {
    id: "tlemcen",
    name: "Tlemcen",
    description: "Capitale de la culture islamique en Algérie.",
    image: "/images/destinations/tlemcen.jpg",
    href: "/destinations/tlemcen",
    x: 36,
    y: 17,
  },
];

export default function AlgeriaMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredRegion = regions.find((r) => r.id === hovered);

  return (
    <section className="py-20 bg-[var(--parchment)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left text */}
          <div className="lg:w-1/3">
            <span className="text-sm uppercase tracking-widest text-[var(--sienna)] font-medium">
              Carte interactive
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-[var(--night)] leading-tight">
              Découvrez les régions d'Algérie
            </h2>
            <div className="w-16 h-0.5 bg-[var(--sienna)] mt-4 mb-6" />
            <ul className="flex flex-col gap-3">
              {regions.map((region) => (
                <li key={region.id}>
                  <Link
                    href={region.href}
                    className={`text-sm font-medium transition-colors ${
                      hovered === region.id
                        ? "text-[var(--night)]"
                        : "text-[var(--sienna)]"
                    } hover:underline`}
                    onMouseEnter={() => setHovered(region.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {region.name}
                  </Link>
                  <span className="text-gray-500 text-sm"> : {region.description}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/destinations"
              className="inline-block mt-8 bg-[var(--sienna)] text-white text-sm px-6 py-3 font-medium hover:bg-[var(--night)] transition-colors duration-300"
            >
              EXPLORER LES RÉGIONS
            </Link>
          </div>

          {/* Right — PNG map with markers */}
          <div className="lg:w-2/3 relative select-none">
            <div className="relative w-full">
              <Image
                src="/images/algeria-map.png"
                alt="Carte de l'Algérie"
                width={800}
                height={750}
                className="w-full h-auto"
              />

              {/* Markers */}
              {regions.map((region) => (
                <button
                  key={region.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${region.x}%`, top: `${region.y}%` }}
                  onMouseEnter={() => setHovered(region.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* + circle marker */}
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      hovered === region.id
                        ? "bg-[var(--sienna)] border-[var(--sienna)] scale-125"
                        : "bg-white/80 border-[var(--sand)] hover:scale-110"
                    }`}
                  >
                    <span
                      className={`text-lg font-light leading-none ${
                        hovered === region.id ? "text-white" : "text-[var(--sienna)]"
                      }`}
                    >
                      +
                    </span>
                  </div>

                  {/* Hover card */}
                  {hovered === region.id && hoveredRegion && (
                    <div className="absolute z-20 bottom-full mb-3 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-xl overflow-hidden w-48 pointer-events-none">
                      <div className="relative h-24 w-full">
                        <Image
                          src={hoveredRegion.image}
                          alt={hoveredRegion.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <p className="font-bold text-[var(--night)] text-sm">
                          {hoveredRegion.name}
                        </p>
                        <p className="text-xs text-[var(--sienna)] mt-0.5 font-medium">
                          › DÉCOUVRIR
                        </p>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}