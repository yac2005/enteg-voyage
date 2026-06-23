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
    // rough SVG path for south-east Algeria
    path: "M 620 480 L 680 460 L 720 500 L 700 560 L 640 570 L 600 530 Z",
    labelX: 660,
    labelY: 515,
  },
  {
    id: "taghit",
    name: "Taghit & Béchar",
    description: "Dunes dorées et palmeraie au cœur du désert.",
    image: "/images/destinations/taghit.jpg",
    href: "/destinations/taghit",
    path: "M 280 380 L 360 360 L 380 420 L 340 470 L 270 460 L 250 420 Z",
    labelX: 315,
    labelY: 415,
  },
  {
    id: "ghardaia",
    name: "Ghardaïa & M'Zab",
    description: "Architecture mozabite classée UNESCO.",
    image: "/images/destinations/ghardaia.jpg",
    href: "/destinations/ghardaia",
    path: "M 420 300 L 500 285 L 520 340 L 480 380 L 410 370 L 390 330 Z",
    labelX: 455,
    labelY: 330,
  },
  {
    id: "oran",
    name: "Oran",
    description: "Ville cosmopolite au bord de la Méditerranée.",
    image: "/images/destinations/oran.jpg",
    href: "/destinations/oran",
    path: "M 160 100 L 230 90 L 245 130 L 210 160 L 155 150 L 140 120 Z",
    labelX: 192,
    labelY: 125,
  },
  {
    id: "constantine",
    name: "Constantine",
    description: "La ville des ponts suspendus sur ses falaises.",
    image: "/images/destinations/constantine.jpg",
    href: "/destinations/constantine",
    path: "M 500 95 L 570 85 L 585 125 L 545 155 L 490 145 L 478 115 Z",
    labelX: 530,
    labelY: 120,
  },
  {
    id: "tlemcen",
    name: "Tlemcen",
    description: "Capitale de la culture islamique en Algérie.",
    image: "/images/destinations/tlemcen.jpg",
    href: "/destinations/tlemcen",
    path: "M 100 130 L 165 120 L 178 158 L 145 185 L 95 175 L 82 148 Z",
    labelX: 130,
    labelY: 153,
  },
];

export default function AlgeriaMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [cardPos, setCardPos] = useState({ x: 0, y: 0 });

  const hoveredRegion = regions.find((r) => r.id === hovered);

  const handleMouseMove = (e: React.MouseEvent<SVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCardPos({
      x: e.clientX - rect.left + 16,
      y: e.clientY - rect.top - 60,
    });
  };

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
                    className="text-sm font-medium text-[var(--sienna)] hover:underline"
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

          {/* Right — SVG map */}
          <div className="lg:w-2/3 relative">
            <svg
              viewBox="0 0 800 620"
              className="w-full h-auto"
              onMouseMove={handleMouseMove}
            >
              {/* Algeria outline — simplified */}
              <path
                d="M 120 80 L 200 60 L 350 55 L 500 50 L 600 60 L 680 80 L 720 130 L 730 200 L 720 300 L 710 420 L 700 570 L 550 590 L 400 600 L 250 590 L 150 560 L 100 450 L 80 320 L 75 200 L 90 130 Z"
                fill="#E8D9C0"
                stroke="#C9A96E"
                strokeWidth="2"
              />

              {/* Region patches */}
              {regions.map((region) => (
                <g key={region.id}>
                  <path
                    d={region.path}
                    fill={hovered === region.id ? "#B85C2A" : "#C9A96E"}
                    stroke="white"
                    strokeWidth="1.5"
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHovered(region.id)}
                    onMouseLeave={() => setHovered(null)}
                    style={{ opacity: hovered === region.id ? 1 : 0.7 }}
                  />
                  <text
                    x={region.labelX}
                    y={region.labelY}
                    textAnchor="middle"
                    fontSize="10"
                    fill="white"
                    fontWeight="600"
                    className="pointer-events-none select-none"
                  >
                    {region.name.split(" ")[0]}
                  </text>
                </g>
              ))}
            </svg>

            {/* Hover card */}
            {hoveredRegion && (
              <div
                className="absolute pointer-events-none z-20 bg-white rounded-xl shadow-lg overflow-hidden w-52 transition-opacity duration-200"
                style={{ left: cardPos.x, top: cardPos.y }}
              >
                <div className="relative h-28 w-full">
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
                    &gt; DÉCOUVRIR
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}