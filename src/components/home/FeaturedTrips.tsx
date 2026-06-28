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

        {/* 
          CHANGED: grid-cols-2 on mobile, lg:grid-cols-4 on desktop
          gap-4 on mobile, gap-6 on desktop
        */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {trips.map((trip) => (
            <Link
              key={trip.id}
              href={`/trips/${trip.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-transparent hover:border-[var(--sand)] transition-all duration-300 flex flex-col
                /* Mobile: aggressive shadow | Desktop: subtle shadow */
                shadow-[0_12px_40px_rgba(26,18,8,0.35),0_4px_12px_rgba(26,18,8,0.25)] 
                md:shadow-none md:hover:shadow-lg md:hover:shadow-[var(--sienna)]/5"
            >
              {/* Image */}
              <div className="relative h-36 md:h-48 w-full overflow-hidden">
                <Image
                  src={trip.image}
                  alt={trip.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-2 left-2 md:top-3 md:left-3">
                  <span className="bg-[var(--sienna)] text-white text-[10px] md:text-xs px-2 py-1 md:px-3 md:py-1.5 rounded-full font-semibold uppercase tracking-wide">
                    {trip.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-3 md:p-4 flex flex-col flex-1">
                <h3 className="font-bold text-[var(--night)] text-sm md:text-base leading-snug group-hover:text-[var(--sienna)] transition-colors duration-200">
                  {trip.title}
                </h3>

                {/* Meta */}
                <div className="flex items-center gap-2 md:gap-3 mt-2 text-[10px] md:text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    {trip.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    {trip.destinations[0]}
                  </span>
                </div>

                {/* Includes — hidden on mobile (too cramped), visible on md+ */}
                <div className="hidden md:flex mt-2.5 flex-wrap gap-x-2.5 gap-y-1">
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

                {/* Footer — CTA only, NO PRICE */}
                <div className="mt-auto pt-3 md:pt-4 flex items-center justify-end">
                  <span className="inline-flex items-center gap-1 text-[10px] md:text-xs font-semibold text-[var(--sienna)] group-hover:underline">
                    Voir
                    <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5 transition-transform group-hover:translate-x-0.5" />
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
