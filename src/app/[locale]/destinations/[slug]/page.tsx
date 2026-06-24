import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Destination, Trip } from "@/lib/data";
import { MapPin, Clock, CheckCircle, ArrowRight } from "lucide-react";

async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  const q = query(collection(db, "destinations"), where("slug", "==", slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...snap.docs[0].data() } as Destination;
}

async function getRelatedTrips(slug: string): Promise<Trip[]> {
  const snap = await getDocs(collection(db, "trips"));
  const all = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Trip));
  return all.filter((t) =>
    t.destinations.some((d) => d.toLowerCase().includes(slug.toLowerCase()))
  );
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const dest = await getDestinationBySlug(slug);
  if (!dest) notFound();

  const relatedTrips = await getRelatedTrips(slug);

  return (
    <div className="pb-20">
      {/* Full-bleed hero */}
      <div className="relative h-[70vh] w-full">
        <Image src={dest.image} alt={dest.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        {/* Back link */}
        <Link
          href="/destinations"
          className="absolute top-28 left-8 text-white/70 hover:text-white text-sm flex items-center gap-2 transition-colors"
        >
          ← Toutes les destinations
        </Link>

        {/* Hero text — bottom left like a magazine */}
        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--sand)] font-medium">
            {dest.tag}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mt-2 leading-none">
            {dest.name}
          </h1>
          <div className="flex items-center gap-2 mt-3 text-white/60 text-sm">
            <MapPin className="w-4 h-4" />
            {dest.region}, Algérie
          </div>
        </div>
      </div>

      {/* Content grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* Left — main content */}
        <div className="lg:col-span-2">
          <div className="w-12 h-0.5 bg-[var(--sienna)] mb-6" />
          <p className="text-gray-600 text-xl leading-relaxed">{dest.description}</p>

          {/* Why visit */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-[var(--night)] mb-6">Pourquoi visiter {dest.name} ?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Paysages uniques et authentiques",
                "Culture et patrimoine millénaire",
                "Gastronomie locale exceptionnelle",
                "Accueil chaleureux et hospitalier",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 bg-[var(--parchment)] rounded-xl p-4">
                  <CheckCircle className="w-5 h-5 text-[var(--sienna)] shrink-0 mt-0.5" />
                  <span className="text-sm text-[var(--night)] font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related trips */}
          {relatedTrips.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-[var(--night)] mb-6">
                Voyages vers {dest.name}
              </h2>
              <div className="flex flex-col gap-4">
                {relatedTrips.map((trip) => (
                  <Link
                    key={trip.id}
                    href={`/trips/${trip.slug}`}
                    className="group flex gap-4 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
                  >
                    <div className="relative w-36 shrink-0">
                      <Image
                        src={trip.image}
                        alt={trip.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="py-4 pr-4 flex flex-col justify-between flex-1">
                      <div>
                        <span className="text-xs text-[var(--sienna)] uppercase tracking-wider font-medium">
                          {trip.tag}
                        </span>
                        <h3 className="font-bold text-[var(--night)] mt-1">{trip.title}</h3>
                        <div className="flex items-center gap-1 text-sm text-gray-400 mt-1">
                          <Clock className="w-3 h-3" />
                          {trip.duration}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-[var(--sienna)] font-bold">
                          {trip.price.toLocaleString()} DZD
                        </p>
                        <span className="text-xs text-[var(--sienna)] flex items-center gap-1 group-hover:gap-2 transition-all">
                          Voir <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right — sticky sidebar */}
        <div className="lg:sticky lg:top-28 h-fit flex flex-col gap-6">
          {/* CTA card */}
          <div className="bg-[var(--night)] rounded-2xl p-6 text-white">
            <h3 className="font-bold text-lg">Envie de visiter {dest.name} ?</h3>
            <p className="text-white/60 text-sm mt-2">
              Contactez-nous pour un circuit sur mesure ou choisissez un voyage organisé.
            </p>
            <Link
              href="/contact"
              className="block mt-5 bg-[var(--sienna)] text-white text-sm font-semibold px-6 py-3 rounded-xl text-center hover:opacity-90 transition-opacity"
            >
              Demander un devis
            </Link>
            <Link
              href="/trips"
              className="block mt-3 border border-white/20 text-white/80 text-sm font-medium px-6 py-3 rounded-xl text-center hover:border-white/40 transition-colors"
            >
              Voir tous les voyages
            </Link>
          </div>

          {/* Info card */}
          <div className="bg-[var(--parchment)] rounded-2xl p-6">
            <h3 className="font-bold text-[var(--night)] mb-4">Infos pratiques</h3>
            <ul className="flex flex-col gap-3 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[var(--sienna)] shrink-0" />
                {dest.region}, Algérie
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[var(--sienna)] shrink-0" />
                Meilleure période : Oct — Avr
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[var(--sienna)] shrink-0" />
                Visa inclus dans nos forfaits
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}