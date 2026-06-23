import Image from "next/image";
import Link from "next/link";
import destinations from "@/content/destinations.json";

export default function DestinationsPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <div className="bg-[var(--parchment)] py-16 px-6 text-center">
        <span className="text-sm uppercase tracking-widest text-[var(--sienna)] font-medium">
          Nos destinations
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mt-2 text-[var(--night)]">
          Explorez l'Algérie
        </h1>
        <p className="text-gray-500 mt-4 max-w-xl mx-auto">
          Des dunes du Sahara aux côtes méditerranéennes, chaque destination
          raconte une histoire unique.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((dest) => (
          <Link
            key={dest.id}
            href={`destinations/${dest.id}`}
            className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
          >
            <div className="relative h-60 w-full">
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-[var(--sienna)] text-white text-xs px-3 py-1 rounded-full font-medium">
                  {dest.tag}
                </span>
              </div>
            </div>
            <div className="p-5">
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                {dest.region}
              </p>
              <h2 className="text-xl font-bold text-[var(--night)] mt-1">
                {dest.name}
              </h2>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                {dest.description}
              </p>
              <span className="inline-block mt-4 text-sm text-[var(--sienna)] font-medium group-hover:underline">
                Découvrir →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}