"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const destinations = [
  "Djanet & Tassili", "Ghardaïa & M'Zab", "Taghit & Béchar",
  "Oran", "Constantine", "Tlemcen",
];
const months = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];
const travelers = ["1 voyageur", "2 voyageurs", "3 voyageurs", "4 voyageurs", "5+ voyageurs"];

export default function Hero() {
  const t = useTranslations("hero");
  const pathname = usePathname();
  const router = useRouter();
  const locale = pathname.split("/")[1];

  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [traveler, setTraveler] = useState("");

  const handleSubmit = () => {
    const params = new URLSearchParams();
    if (destination) params.set("dest", destination);
    if (date) params.set("date", date);
    if (traveler) params.set("travelers", traveler);
    router.push(`/${locale}/contact?${params.toString()}`);
  };

  return (
    <div className="relative pb-0 md:pb-[72px] -mt-[108px]">

      <section className="relative w-full h-[60vh] md:h-screen min-h-[400px] md:min-h-[500px] flex flex-col items-center justify-end md:justify-center pt-[108px] pb-36 md:pb-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-bg1.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/40 md:bg-black/45" />

        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto gap-4 mb-4 md:mb-0 md:-mt-16">
          <h1 className="text-3xl md:text-6xl font-bold text-white/90 md:text-white/85 leading-tight">
            {t("tagline")}
          </h1>
        </div>
      </section>

      {/* DESKTOP: Unchanged */}
      <div className="
        hidden md:block
        absolute z-20
        bottom-0 left-0 right-0
        -translate-y-40
        px-6
      ">
        <div className="
          max-w-5xl mx-auto
          bg-white/30 backdrop-blur-md
          rounded-2xl shadow-2xl
          px-6 py-5
          flex flex-row items-center gap-4
        ">
          <div className="flex-1 w-full">
            <label className="text-black/60 font-bold text-xs uppercase tracking-wider mb-1 block">
              Destination
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full border border-white/40 rounded-lg px-3 py-2 text-sm text-[var(--night)] font-medium focus:outline-none bg-white/70"
            >
              <option value="">Choisir une destination</option>
              {destinations.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="w-px h-10 bg-white/30" />

          <div className="flex-1 w-full">
            <label className="text-black/60 font-bold text-xs uppercase tracking-wider mb-1 block">
              Date de départ
            </label>
            <select
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-white/40 rounded-lg px-3 py-2 text-sm text-[var(--night)] font-medium focus:outline-none bg-white/70"
            >
              <option value="">Mois souhaité</option>
              {months.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div className="w-px h-10 bg-white/30" />

          <div className="flex-1 w-full">
            <label className="text-black/60 font-bold text-xs uppercase tracking-wider mb-1 block">
              Voyageurs
            </label>
            <select
              value={traveler}
              onChange={(e) => setTraveler(e.target.value)}
              className="w-full border border-white/40 rounded-lg px-3 py-2 text-sm text-[var(--night)] font-medium focus:outline-none bg-white/70"
            >
              <option value="">Nombre de voyageurs</option>
              {travelers.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <button
            onClick={handleSubmit}
            className="w-auto bg-[var(--sienna)] text-white text-sm font-semibold px-8 py-3 rounded-xl hover:bg-[var(--night)] transition-colors duration-300 whitespace-nowrap uppercase tracking-wider"
          >
            Demander un devis
          </button>
        </div>
      </div>

      {/* MOBILE: Transparent glassmorphism */}
      <div className="
        md:hidden
        relative z-20
        -mt-20
        px-4
      ">
        <div className="
          max-w-lg mx-auto
          bg-white/75 backdrop-blur-lg
          border border-white/40
          rounded-2xl shadow-[0_8px_30px_rgba(26,18,8,0.15)]
          px-4 py-4
          flex flex-col gap-3
        ">
          <div className="flex items-center gap-3 border-b border-white/30 pb-3">
            <svg className="w-5 h-5 text-[var(--sienna)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full text-sm text-[var(--night)] font-medium focus:outline-none bg-transparent"
            >
              <option value="">Où allez-vous ?</option>
              {destinations.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-3 border-b border-white/30 pb-3">
            <svg className="w-5 h-5 text-[var(--sienna)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <select
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full text-sm text-[var(--night)] font-medium focus:outline-none bg-transparent"
            >
              <option value="">Quand ?</option>
              {months.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-3 pb-1">
            <svg className="w-5 h-5 text-[var(--sienna)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <select
              value={traveler}
              onChange={(e) => setTraveler(e.target.value)}
              className="w-full text-sm text-[var(--night)] font-medium focus:outline-none bg-transparent"
            >
              <option value="">Combien ?</option>
              {travelers.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-[var(--sienna)] text-white text-sm font-bold py-3.5 rounded-xl hover:bg-[var(--night)] transition-colors duration-300 uppercase tracking-wider mt-1"
          >
            Demander un devis
          </button>
        </div>
      </div>

    </div>
  );
}
