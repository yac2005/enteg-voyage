import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import destinations from "@/content/destinations.json";
import trips from "@/content/trips.json";

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const dest = destinations.find((d) => d.id === slug);

  if (!dest) notFound();

  const relatedTrips = trips.filter((t) =>
    t.destinations.some((d) =>
      d.toLowerCase().includes(dest.name.toLowerCase().split(" ")[0])
    )
  );

  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <div className="relative h-96 w-full">
        <Image
          src={dest.image}
          alt={dest.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="text-sm uppercase tracking-widest text-[var(--sand)] font-medium">
            {dest.tag}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-2">
            {dest.name}
          </h1>
          <p className="text-white/70 mt-3 max-w-xl">{dest.region}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 mt-12">
        <p className="text-gray-600 text-lg leading-relaxed">{dest.description}</p>
      </div>

      {/* Related trips */}
      {relatedTrips.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 mt-16">
          <h2 className="text-2xl font-bold text-[var(--night)] mb-6">
            Voyages vers {dest.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedTrips.map((trip) => (
              <Link
                key={trip.id}
                href={`../../trips/${trip.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={trip.image}
                    alt={trip.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[var(--night)]">{trip.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{trip.duration}</p>
                  <p className="text-[var(--sienna)] font-bold mt-2">
                    {trip.price.toLocaleString()} DZD
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="text-center mt-12">
        <Link
          href="../destinations"
          className="inline-block border border-[var(--sienna)] text-[var(--sienna)] px-8 py-3 rounded-full text-sm font-medium hover:bg-[var(--sienna)] hover:text-white transition-colors duration-300"
        >
          ← Toutes les destinations
        </Link>
      </div>
    </div>
  );
}