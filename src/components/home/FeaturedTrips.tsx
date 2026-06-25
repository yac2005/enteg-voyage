"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin, CheckCircle, ArrowRight } from "lucide-react";
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
              className="group bg-white rounded-2xl overflow-hidden border border-transparent hover:border-[var(--sand)] hover:shadow-lg hover:shadow-[var(--sienna)]/5 transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={trip.image}
                  alt={trip.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-[var(--sienna)] text-white text-xs px-3 py-1.5 rounded-full font-semibold uppercase tracking-wide">
                    {trip.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-bold text-[var(--night)] text-base leading-snug group-hover:text-[var(--sienna)] transition-colors duration-200">
                  {trip.title}
                </h3>

                {/* Meta */}
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {trip.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {trip.destinations[0]}
                  </span>
                </div>

                {/* Includes — tighter, less dominant */}
                <div className="mt-2.5 flex flex-wrap gap-x-2.5 gap-y-1">
                  {trip.includedServices.map((item) => (
                    <span
                      key={item}
                      className="flex items-center gap-1 text-[11px] text-gray-400"
                    >
                      <CheckCircle className="w-3 h-3 text-[var(--sand)] flex-shrink-0" />
                      {item}
                    </span>
                  ))}
                </div>

                {/* Footer — price + CTA */}
                <div className="mt-auto pt-4 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                      À partir de
                    </span>
                    <p className="text-[var(--night)] font-bold text-lg leading-tight">
                      {trip.price.toLocaleString()}
                      <span className="text-sm font-semibold text-[var(--sienna)] ml-0.5">
                        DZD
                      </span>
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--sienna)] group-hover:underline">
                    Voir
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/trips"
            className="inline-flex items-center gap-2 bg-[var(--sienna)] text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-[var(--night)] transition-colors duration-300"
          >
            Voir tous les voyages
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}