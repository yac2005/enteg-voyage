"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Users } from "lucide-react";
import { getTransport, Transport} from "@/lib/data";

type Filter = "all" | "with" | "without";

// Helper function to handle the driver badge UI based on driverMode
const getDriverBadge = (mode: string) => {
  switch (mode) {
    case "with":
      return { label: "Avec chauffeur", style: "bg-[var(--sienna)] text-white" };
    case "without":
      return { label: "Sans chauffeur", style: "bg-[var(--night)] text-white" };
    case "both":
    default:
      return { label: "Avec ou sans chauffeur", style: "bg-gray-600 text-white" };
  }
};

export default function TransportPage() {
  const [vehicles, setVehicles] = useState<Transport[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTransport().then((data) => {
      setVehicles(data);
      setLoading(false);
    });
  }, []);

  const filtered = vehicles.filter((v) => {
    if (filter === "with") return v.driverMode === "with" || v.driverMode === "both";
    if (filter === "without") return v.driverMode === "without" || v.driverMode === "both";
    return true;
  });

  return (
    <div className="pb-0">
      {/* Hero */}
      <div className="relative h-[55vh] min-h-[400px] w-full">
        <Image
          src="/images/transport/hero-transport.jpg"
          alt="Location de véhicules"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[var(--night)]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-24">
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--sand)] font-medium">
            Mobilité en Algérie
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-3 leading-tight">
            Location de véhicules
          </h1>
          <p className="text-white/60 mt-4 max-w-lg text-base">
            Avec ou sans chauffeur — une flotte adaptée à chaque terrain et chaque besoin.
          </p>
        </div>
      </div>

      {/* Filter toggle */}
      <div className="bg-[var(--night)] pb-12 pt-8 flex justify-center px-6">
        <div className="inline-flex bg-white/10 rounded-2xl p-1 gap-1">
          {[
            { key: "all", label: "Tous les véhicules" },
            { key: "with", label: "Avec chauffeur" },
            { key: "without", label: "Sans chauffeur" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key as Filter)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                filter === key
                  ? "bg-[var(--sienna)] text-white shadow-lg"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Vehicles */}
      <div className="bg-[var(--parchment)] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <p className="text-center text-gray-400">Chargement...</p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-gray-400">Aucun véhicule disponible.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filtered.map((v) => {
                const badge = getDriverBadge(v.driverMode);
                return (
                  <div
                    key={v.id}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                  >
                    {/* Image */}
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        src={v.image}
                        alt={v.vehicleType}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${badge.style}`}>
                          {badge.label}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-bold text-[var(--night)] text-xl">{v.vehicleType}</h3>
                      <div className="flex items-center gap-2 mt-3 text-sm text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>Jusqu'à {v.capacity} personnes</span>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">

                        <Link
                          href={`/transport/${v.id}`}
                          className="bg-[var(--sienna)] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[var(--night)] transition-colors duration-300"
                        >
                          Voir →
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-[var(--night)] py-20 px-6 text-center">
        <h2 className="text-3xl font-bold text-white">Besoin d'un véhicule sur mesure ?</h2>
        <p className="text-white/50 mt-3 max-w-lg mx-auto">
          Flotte entière disponible pour groupes, événements ou circuits longue durée.
        </p>
        <Link
          href="/contact"
          className="inline-block mt-8 bg-[var(--sienna)] text-white text-sm font-semibold px-10 py-4 rounded-full hover:opacity-90 transition-opacity uppercase tracking-wider"
        >
          Demander un devis
        </Link>
      </div>
    </div>
  );
}