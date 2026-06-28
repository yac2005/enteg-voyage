"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getDestinations, Destination } from "@/lib/data";

export default function Destinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDestinations()
      .then(setDestinations)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="pt-48 pb-20 text-center text-gray-400">Chargement...</div>;
  if (!destinations.length) return <div className="pt-48 pb-20 text-center text-gray-400">Aucune destination trouvée.</div>;

  return (
    <section className="pt-48 pb-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-sm uppercase tracking-widest text-[var(--sienna)] font-medium">
          Nos destinations
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 text-[var(--night)]">
          Explorez l'Algérie
        </h2>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
          Des dunes du Sahara aux côtes méditerranéennes, chaque destination raconte une histoire.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
        {destinations.map((dest) => (
          <Link
            key={dest.id}
            href={`/destinations/${dest.slug}`}
            className="group relative block"
          >
            {/* 
              AGGRESSIVE SHADOW: No border, just heavy shadow
              - Larger gap so shadow has room to breathe
              - Multi-layer shadow for depth
              - Darker, more spread
            */}
            <div className="relative rounded-2xl overflow-hidden h-52 md:h-72 shadow-[0_8px_30px_rgba(26,18,8,0.25),0_2px_8px_rgba(26,18,8,0.15)] transition-all duration-300 group-hover:shadow-[0_15px_50px_rgba(26,18,8,0.35),0_5px_15px_rgba(26,18,8,0.2)] group-hover:-translate-y-1">
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 p-3 md:p-5">
                <span className="text-[10px] md:text-xs uppercase tracking-wider text-[var(--sand)] font-medium">
                  {dest.tag}
                </span>
                <h3 className="text-white text-base md:text-xl font-bold mt-1">{dest.name}</h3>
                <p className="text-white/70 text-xs md:text-sm mt-1">{dest.region}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          href="/destinations"
          className="inline-block border border-[var(--sienna)] text-[var(--sienna)] px-8 py-3 rounded-full text-sm font-medium hover:bg-[var(--sienna)] hover:text-white transition-colors duration-300"
        >
          Voir toutes les destinations
        </Link>
      </div>
    </section>
  );
}
