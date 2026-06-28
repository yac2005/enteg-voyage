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

      <section className="relative w-full h-screen min-h-[500px] flex flex-col items-center justify-center pt-[108px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-bg1.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto gap-4 -mt-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white/85 leading-tight">
            {t("tagline")}
          </h1>
        </div>
      </section>

      {/* 
        FIX: md:-translate-y-8 pulls the bar UP by 32px
        (negative translate moves opposite to positive)
      */}
      <div className="
        relative z-20
        md:absolute md:bottom-0 md:left-0 md:right-0 md:-translate-y-8
        px-4 md:px-6
        py-4 md:py-0
        bg-[var(--parchment)] md:bg-transparent
      ">
        <div className="
          max-w-5xl mx-auto
          bg-white md:bg-white/30
          md:backdrop-blur-md
          rounded-2xl shadow-2xl
          px-4 md:px-6 py-4 md:py-5
          flex flex-col md:flex-row items-center gap-4
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

          <div className="hidden md:block w-px h-10 bg-white/30" />

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

          <div className="hidden md:block w-px h-10 bg-white/30" />

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
            className="w-full md:w-auto bg-[var(--sienna)] text-white text-sm font-semibold px-8 py-3 rounded-xl hover:bg-[var(--night)] transition-colors duration-300 whitespace-nowrap uppercase tracking-wider"
          >
            Demander un devis
          </button>
        </div>
      </div>
    </div>
  );
}
