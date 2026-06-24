"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin, CheckCircle } from "lucide-react";
import { getFeaturedTrips, Trip } from "@/lib/data";

export default function FeaturedTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    getFeaturedTrips().then(setTrips);
  }, []);

  return (
    <section className="py-20 bg-[var(--parchment)]">
      <div className="px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-sm uppercase tracking-widest text-[var(--sienna)] font-medium">
            Voyages organisés
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-[var(--night)]">
            Nos circuits populaires
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            De la visa jusqu'au retour, on s'occupe de tout.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trips.map((trip) => (
            <Link
              key={trip.id}
              href={`/trips/${trip.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative h-48 w-full">
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
              <div className="p-4">
                <h3 className="font-bold text-[var(--night)] text-base leading-snug">
                  {trip.title}
                </h3>
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
                <div className="mt-3 flex flex-wrap gap-1">
                  {trip.includedServices.map((item) => (
                    <span key={item} className="flex items-center gap-1 text-xs text-gray-500">
                      <CheckCircle className="w-3 h-3 text-[var(--sage)]" />
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-400">À partir de</span>
                    <p className="text-[var(--sienna)] font-bold text-base">
                      {trip.price.toLocaleString()} DZD
                    </p>
                  </div>
                  <span className="text-xs text-[var(--sienna)] font-medium group-hover:underline">
                    Voir →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/trips"
            className="inline-block bg-[var(--sienna)] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[var(--night)] transition-colors duration-300"
          >
            Voir tous les voyages
          </Link>
        </div>
      </div>
    </section>
  );
}