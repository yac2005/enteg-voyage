"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { MapPin, Calendar, Users, ArrowRight } from "lucide-react";

const destinations = [
  "Djanet & Tassili",
  "Ghardaïa & M'Zab",
  "Taghit & Béchar",
  "Oran",
  "Constantine",
  "Tlemcen",
];

const travelers = ["1 voyageur", "2 voyageurs", "3 voyageurs", "4 voyageurs", "5+ voyageurs"];

const months = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

export default function QuoteBar() {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [traveler, setTraveler] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const locale = pathname.split("/")[1];

  const handleSubmit = () => {
    const params = new URLSearchParams();
    if (destination) params.set("dest", destination);
    if (date) params.set("date", date);
    if (traveler) params.set("travelers", traveler);
    router.push(`/${locale}/contact?${params.toString()}`);
  };

  return (
    <div className="relative z-20 -mt-20 mx-auto max-w-5xl px-6">
      <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 px-6 py-6 flex flex-col md:flex-row items-stretch gap-4 border border-gray-100">
        
        {/* Destination */}
        <div className="flex-1 w-full">
          <label className="flex items-center gap-1.5 text-[10px] text-gray-400 uppercase tracking-wider mb-2 font-bold">
            <MapPin className="w-3 h-3" />
            Destination
          </label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[var(--night)] font-medium focus:outline-none focus:ring-2 focus:ring-[var(--sienna)]/20 focus:border-[var(--sienna)] bg-gray-50/50 transition-all"
          >
            <option value="">Choisir une destination</option>
            {destinations.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="hidden md:block w-px bg-gray-200 self-stretch my-2" />

        {/* Date */}
        <div className="flex-1 w-full">
          <label className="flex items-center gap-1.5 text-[10px] text-gray-400 uppercase tracking-wider mb-2 font-bold">
            <Calendar className="w-3 h-3" />
            Date de départ
          </label>
          <select
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[var(--night)] font-medium focus:outline-none focus:ring-2 focus:ring-[var(--sienna)]/20 focus:border-[var(--sienna)] bg-gray-50/50 transition-all"
          >
            <option value="">Mois souhaité</option>
            {months.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="hidden md:block w-px bg-gray-200 self-stretch my-2" />

        {/* Travelers */}
        <div className="flex-1 w-full">
          <label className="flex items-center gap-1.5 text-[10px] text-gray-400 uppercase tracking-wider mb-2 font-bold">
            <Users className="w-3 h-3" />
            Voyageurs
          </label>
          <select
            value={traveler}
            onChange={(e) => setTraveler(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[var(--night)] font-medium focus:outline-none focus:ring-2 focus:ring-[var(--sienna)]/20 focus:border-[var(--sienna)] bg-gray-50/50 transition-all"
          >
            <option value="">Nombre de voyageurs</option>
            {travelers.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* CTA */}
        <div className="flex items-end">
          <button
            onClick={handleSubmit}
            className="w-full md:w-auto h-[calc(100%-24px)] min-h-[46px] bg-[var(--sienna)] text-white text-sm font-semibold px-8 rounded-xl hover:bg-[var(--night)] transition-colors duration-300 whitespace-nowrap uppercase tracking-wider shadow-lg shadow-[var(--sienna)]/25 flex items-center justify-center gap-2"
          >
            Demander un devis
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}