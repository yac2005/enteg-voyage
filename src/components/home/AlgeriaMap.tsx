"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const regions = [
  {
    id: "djanet",
    name: "Djanet & Tassili",
    description: "Paysages lunaires et gravures rupestres millénaires.",
    image: "/images/destinations/djanet.jpg",
    href: "/destinations/djanet",
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
  const [active, setActive] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const activeRegion = regions.find((r) => r.id === (active || hovered));

  // Intersection observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-[var(--parchment)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left text */}
          <div
            className={`lg:w-1/3 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <span className="text-sm uppercase tracking-widest text-[var(--sienna)] font-medium">
              Carte interactive
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-[var(--night)] leading-tight">
              Découvrez les régions d'Algérie
            </h2>
            <div className="w-16 h-0.5 bg-[var(--sienna)] mt-4 mb-6" />

            {/* Region list with active state */}
            <ul className="flex flex-col gap-1">
              {regions.map((region) => {
                const isActive = (active || hovered) === region.id;
                return (
                  <li key={region.id}>
                    <Link
                      href={region.href}
                      className="group flex items-start gap-2 py-2 transition-all duration-200"
                      onMouseEnter={() => setHovered(region.id)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => setActive(active === region.id ? null : region.id)}
                    >
                      {/* Active indicator dot */}
                      <span
                        className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 transition-all duration-300 ${
                          isActive
                            ? "bg-[var(--sienna)] scale-125"
                            : "bg-[var(--sand)] group-hover:bg-[var(--sienna)]/60"
                        }`}
                      />
                      <span>
                        <span
                          className={`text-sm font-semibold transition-colors duration-200 ${
                            isActive
                              ? "text-[var(--night)]"
                              : "text-[var(--sienna)] group-hover:text-[var(--night)]"
                          }`}
                        >
                          {region.name}
                        </span>
                        <span
                          className={`text-sm ml-1 transition-colors duration-200 ${
                            isActive ? "text-gray-600" : "text-gray-400"
                          }`}
                        >
                          {region.description}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Link
              href="/destinations"
              className="inline-block mt-8 bg-[var(--sienna)] text-white text-sm px-6 py-3 font-medium hover:bg-[var(--night)] transition-colors duration-300"
            >
              EXPLORER LES RÉGIONS
            </Link>
          </div>

          {/* Right — Map with markers */}
          <div
            className={`lg:w-2/3 relative select-none transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative w-full">
              {/* Map image with subtle shadow for depth */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/algeria-map.png"
                  alt="Carte de l'Algérie"
                  width={800}
                  height={750}
                  className="w-full h-auto"
                  priority
                />

                {/* Subtle overlay gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--parchment)]/20 to-transparent pointer-events-none" />
              </div>

              {/* Markers */}
              {regions.map((region, index) => {
                const isActive = (active || hovered) === region.id;
                return (
                  <button
                    key={region.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sienna)] rounded-full"
                    style={{
                      left: `${region.x}%`,
                      top: `${region.y}%`,
                      animationDelay: `${index * 100}ms`,
                    }}
                    onMouseEnter={() => setHovered(region.id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setActive(active === region.id ? null : region.id)}
                    aria-label={`Découvrir ${region.name}`}
                  >
                    {/* Pulse ring animation */}
                    <span
                      className={`absolute inset-0 rounded-full border-2 border-[var(--sienna)] animate-ping ${
                        isActive ? "opacity-40" : "opacity-0"
                      }`}
                    />

                    {/* Main marker */}
                    <div
                      className={`relative w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-md ${
                        isActive
                          ? "bg-[var(--sienna)] border-[var(--sienna)] scale-125 shadow-lg shadow-[var(--sienna)]/30"
                          : "bg-white border-[var(--sienna)]/40 hover:border-[var(--sienna)] hover:scale-110 shadow-sm"
                      }`}
                    >
                      {/* Inner dot */}
                      <span
                        className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                          isActive ? "bg-white" : "bg-[var(--sienna)]"
                        }`}
                      />

                      {/* Label that appears on hover (desktop) */}
                      <span
                        className={`absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-[var(--night)] bg-white px-2 py-1 rounded-md shadow-md transition-all duration-200 pointer-events-none ${
                          isActive
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0"
                        }`}
                      >
                        {region.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active region detail card (appears below map on mobile, beside on desktop) */}
            {activeRegion && (
              <div className="mt-6 lg:mt-0 lg:absolute lg:bottom-4 lg:right-4 lg:w-64 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <Link href={activeRegion.href} className="block group">
                  <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-[var(--sand)]/30">
                    <div className="relative h-32 w-full overflow-hidden">
                      <Image
                        src={activeRegion.image}
                        alt={activeRegion.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute bottom-2 left-3">
                        <h3 className="text-white font-bold text-lg">
                          {activeRegion.name}
                        </h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {activeRegion.description}
                      </p>
                      <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-[var(--sienna)] group-hover:text-[var(--night)] transition-colors">
                        DÉCOUVRIR
                        <svg
                          className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}