import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, MapPin, CheckCircle } from "lucide-react";
import trips from "@/content/trips.json";

export default async function TripPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const trip = trips.find((t) => t.id === slug);

  if (!trip) notFound();

  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <div className="relative h-96 w-full">
        <Image
          src={trip.image}
          alt={trip.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="bg-[var(--sienna)] text-white text-xs px-3 py-1 rounded-full font-medium mb-4">
            {trip.tag}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {trip.title}
          </h1>
          <div className="flex items-center gap-6 mt-4 text-white/70 text-sm">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {trip.duration}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {trip.destinations.join(", ")}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-[var(--night)] mb-4">
            Ce qui est inclus
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {trip.includes.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 bg-[var(--parchment)] rounded-xl px-4 py-3"
              >
                <CheckCircle className="w-5 h-5 text-[var(--sage)]" />
                <span className="text-sm font-medium text-[var(--night)]">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-[var(--night)] mt-10 mb-4">
            Destinations
          </h2>
          <div className="flex flex-wrap gap-2">
            {trip.destinations.map((d) => (
              <span
                key={d}
                className="bg-white border border-[var(--sand)] text-[var(--night)] text-sm px-4 py-2 rounded-full"
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="bg-white rounded-2xl shadow-md p-6 h-fit">
          <p className="text-sm text-gray-400">À partir de</p>
          <p className="text-3xl font-bold text-[var(--sienna)] mt-1">
            {trip.price.toLocaleString()} DZD
          </p>
          <p className="text-sm text-gray-500 mt-1">{trip.duration}</p>
          <Link
            href="../../contact"
            className="block mt-6 bg-[var(--sienna)] text-white text-sm font-semibold px-6 py-3 rounded-xl text-center hover:bg-[var(--night)] transition-colors duration-300"
          >
            Réserver ce voyage
          </Link>
          <Link
            href="../../contact"
            className="block mt-3 border border-[var(--sienna)] text-[var(--sienna)] text-sm font-medium px-6 py-3 rounded-xl text-center hover:bg-[var(--parchment)] transition-colors duration-300"
          >
            Demander un devis
          </Link>
        </div>
      </div>

      <div className="text-center mt-12">
        <Link
          href="../trips"
          className="inline-block border border-[var(--sienna)] text-[var(--sienna)] px-8 py-3 rounded-full text-sm font-medium hover:bg-[var(--sienna)] hover:text-white transition-colors duration-300"
        >
          ← Tous les voyages
        </Link>
      </div>
    </div>
  );
}