import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Transport } from "@/lib/data";
import { Users, MapPin, CheckCircle } from "lucide-react";

async function getVehicle(id: string): Promise<Transport | null> {
  const snap = await getDoc(doc(db, "transport", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Transport;
}

export default async function VehiclePage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const v = await getVehicle(id);
  if (!v) notFound();

  const driverLabel =
    v.driverMode === "with"
      ? "Avec chauffeur uniquement"
      : v.driverMode === "without"
      ? "Sans chauffeur uniquement"
      : "Avec ou sans chauffeur";

  return (
    <div className="pb-0">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] w-full">
        <Image src={v.image} alt={v.vehicleType} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <Link
          href="/transport"
          className="absolute top-28 left-8 text-white/70 hover:text-white text-sm transition-colors"
        >
          ← Retour à la flotte
        </Link>

        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--sand)] font-medium">
            {driverLabel}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-2 leading-none">
            {v.vehicleType}
          </h1>
          <div className="flex items-center gap-2 mt-3 text-white/60 text-sm">
            <Users className="w-4 h-4" />
            Jusqu'à {v.capacity} personnes
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mt-16 grid grid-cols-1 lg:grid-cols-3 gap-16 pb-20">

        {/* Left */}
        <div className="lg:col-span-2">
          <div className="w-12 h-0.5 bg-[var(--sienna)] mb-6" />
          <p className="text-gray-600 text-xl leading-relaxed">{v.description}</p>

          {/* Terrain */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-[var(--night)] mb-4">Terrains couverts</h2>
            <div className="flex flex-wrap gap-3">
              {(v.terrain ?? []).map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-2 text-sm text-[var(--sienna)] bg-[var(--parchment)] px-4 py-2 rounded-full font-medium"
                >
                  <MapPin className="w-4 h-4" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Included */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-[var(--night)] mb-4">Inclus dans la location</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Véhicule climatisé",
                "Assurance tous risques",
                "Kilométrage illimité",
                "Assistance 24h/24",
                v.driverMode !== "without" ? "Chauffeur expérimenté" : null,
                "Carburant non inclus",
              ]
                .filter(Boolean)
                .map((item) => (
                  <div key={item!} className="flex items-center gap-3 bg-[var(--parchment)] rounded-xl p-4">
                    <CheckCircle className="w-5 h-5 text-[var(--sienna)] shrink-0" />
                    <span className="text-sm text-[var(--night)] font-medium">{item}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Right — sticky sidebar */}
        <div className="lg:sticky lg:top-28 h-fit flex flex-col gap-6">
          <div className="bg-[var(--night)] rounded-2xl p-6 text-white">
            <h3 className="font-bold text-lg">Intéressé par ce véhicule ?</h3>
            <p className="text-white/60 text-sm mt-2">
              Contactez-nous pour vérifier la disponibilité et obtenir un tarif personnalisé selon vos dates et itinéraire.
            </p>
            <Link
              href={`/contact?vehicle=${encodeURIComponent(v.vehicleType)}`}
              className="block mt-6 bg-[var(--sienna)] text-white text-sm font-semibold px-6 py-3 rounded-xl text-center hover:opacity-90 transition-opacity"
            >
              Réserver ce véhicule
            </Link>
            <Link
              href="/contact"
              className="block mt-3 border border-white/20 text-white/70 text-sm font-medium px-6 py-3 rounded-xl text-center hover:border-white/40 transition-colors"
            >
              Demander un devis
            </Link>
          </div>

          <div className="bg-[var(--parchment)] rounded-2xl p-6">
            <h3 className="font-bold text-[var(--night)] mb-3">Disponibilité</h3>
            <p className="text-sm text-gray-500">
              Contactez-nous pour vérifier la disponibilité aux dates souhaitées.
            </p>
            <p className="text-sm text-[var(--sienna)] font-medium mt-2">+213 XX XX XX XX</p>
          </div>
        </div>
      </div>
    </div>
  );
}