"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

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
    /* Changed '-mt-8' to '-mt-24' to lift it higher up into the hero container */
    <div className="relative z-20 -mt-24 mx-auto max-w-5xl px-6">
      <div className="bg-white rounded-2xl shadow-xl px-6 py-5 flex flex-col md:flex-row items-center gap-4">
        {/* Destination */}
        <div className="flex-1 w-full">
          <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">
            Destination
          </label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[var(--sienna)] bg-white"
          >
            <option value="">Choisir une destination</option>
            {destinations.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="hidden md:block w-px h-10 bg-gray-200" />

        {/* Date */}
        <div className="flex-1 w-full">
          <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">
            Date de départ
          </label>
          <select
            value={date}
            onChange={(e) => setDate(e.nav) || setDate(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[var(--sienna)] bg-white"
          >
            <option value="">Mois souhaité</option>
            {months.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="hidden md:block w-px h-10 bg-gray-200" />

        {/* Travelers */}
        <div className="flex-1 w-full">
          <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">
            Voyageurs
          </label>
          <select
            value={traveler}
            onChange={(e) => setTraveler(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[var(--sienna)] bg-white"
          >
            <option value="">Nombre de voyageurs</option>
            {travelers.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* CTA */}
        <button
          onClick={handleSubmit}
          className="w-full md:w-auto bg-[var(--sienna)] text-white text-sm font-semibold px-8 py-3 rounded-xl hover:bg-[var(--night)] transition-colors duration-300 whitespace-nowrap uppercase tracking-wider"
        >
          Demander un devis
        </button>
      </div>
    </div>
  );
}