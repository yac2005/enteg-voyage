import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, CheckCircle } from "lucide-react";
import trips from "@/content/trips.json";

export default function TripsPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <div className="bg-[var(--parchment)] py-16 px-6 text-center">
        <span className="text-sm uppercase tracking-widest text-[var(--sienna)] font-medium">
          Voyages organisés
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mt-2 text-[var(--night)]">
          Nos circuits
        </h1>
        <p className="text-gray-500 mt-4 max-w-xl mx-auto">
          De la visa jusqu'au retour, on s'occupe de tout.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {trips.map((trip) => (
          <Link
            key={trip.id}
            href={`trips/${trip.id}`}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="relative h-52 w-full">
              <Image
                src={trip.image}
                alt={trip.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-[var(--sienna)] text-white text-xs px-3 py-1 rounded-full font-medium">
                  {trip.tag}
                </span>
              </div>
            </div>
            <div className="p-5">
              <h2 className="font-bold text-[var(--night)] text-lg leading-snug">
                {trip.title}
              </h2>
              <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {trip.duration}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {trip.destinations[0]}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {trip.includes.map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-1 text-xs text-gray-500"
                  >
                    <CheckCircle className="w-3 h-3 text-[var(--sage)]" />
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400">À partir de</span>
                  <p className="text-[var(--sienna)] font-bold text-lg">
                    {trip.price.toLocaleString()} DZD
                  </p>
                </div>
                <span className="text-sm text-[var(--sienna)] font-medium group-hover:underline">
                  Voir →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}