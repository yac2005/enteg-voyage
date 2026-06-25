"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getDestinations, Destination } from "@/lib/data";

export default function Destinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    getDestinations().then(setDestinations);
  }, []);
  

const [loading, setLoading] = useState(true);

useEffect(() => {
  getDestinations()
    .then(setDestinations)
    .finally(() => setLoading(false));
}, []);

if (loading) return <p>Chargement...</p>;
if (!destinations.length) return <p>Aucune destination trouvée.</p>;


  return (
    <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((dest) => (
          <Link
            key={dest.id}
            href={`/destinations/${dest.slug}`}
            className="group relative rounded-2xl overflow-hidden h-72 block"
          >
            <Image
              src={dest.image}
              alt={dest.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5">
              <span className="text-xs uppercase tracking-wider text-[var(--sand)] font-medium">
                {dest.tag}
              </span>
              <h3 className="text-white text-xl font-bold mt-1">{dest.name}</h3>
              <p className="text-white/70 text-sm mt-1">{dest.region}</p>
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