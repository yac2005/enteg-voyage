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
    <div className="relative md:pb-[72px] -mt-[108px]">

      {/* 
        MOBILE: h-[65vh] shorter | DESKTOP: h-screen
        MOBILE: justify-end text at bottom | DESKTOP: justify-center
        MOBILE: bg-black/50 darker overlay | DESKTOP: bg-black/45
        MOBILE: pb-40 space for quote bar | DESKTOP: pb-0
      */}
      <section className="relative w-full h-[65vh] md:h-screen min-h-[500px] flex flex-col items-center justify-end md:justify-center pt-[108px] pb-40 md:pb-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-bg1.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/50 md:bg-black/45" />

        {/* 
          MOBILE: text at bottom, smaller size | DESKTOP: centered, larger
        */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto gap-4 mb-6 md:mb-0 md:-mt-16">
          <h1 className="text-4xl md:text-7xl font-bold text-white/90 md:text-white/85 leading-tight">
            {t("tagline")}
          </h1>
        </div>
      </section>

      {/* 
        MOBILE: absolute at bottom of hero, glassmorphism transparent
        DESKTOP: relative with -mt-24, backdrop blur
      */}
      <div className="
        absolute md:relative
        bottom-6 md:bottom-auto
        left-0 right-0 md:left-auto md:right-auto
        z-20
        px-4 md:px-6
        md:-mt-24
      ">
        {/* 
          MOBILE: glassmorphism (transparent white + blur)
          DESKTOP: white/30 backdrop blur
        */}
        <div className="
          max-w-5xl mx-auto
          bg-white/10 md:bg-white/30
          backdrop-blur-xl md:backdrop-blur-md
          border border-white/20 md:border-transparent
          rounded-2xl shadow-2xl
          px-4 py-4 md:px-6 md:py-5
          flex flex-col md:flex-row items-center gap-3 md:gap-4
        ">

          <div className="flex-1 w-full">
            <label className="text-white/70 md:text-black/60 font-bold text-[10px] md:text-xs uppercase tracking-wider mb-1 block">
              Destination
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full border border-white/30 md:border-white/40 rounded-lg px-3 py-2.5 text-sm text-white md:text-[var(--night)] font-medium focus:outline-none bg-white/20 md:bg-white/70"
            >
              <option value="" className="text-gray-800">Choisir une destination</option>
              {destinations.map((d) => <option key={d} value={d} className="text-gray-800">{d}</option>)}
            </select>
          </div>

          <div className="hidden md:block w-px h-10 bg-white/30" />

          <div className="flex-1 w-full">
            <label className="text-white/70 md:text-black/60 font-bold text-[10px] md:text-xs uppercase tracking-wider mb-1 block">
              Date de départ
            </label>
            <select
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-white/30 md:border-white/40 rounded-lg px-3 py-2.5 text-sm text-white md:text-[var(--night)] font-medium focus:outline-none bg-white/20 md:bg-white/70"
            >
              <option value="" className="text-gray-800">Mois souhaité</option>
              {months.map((m) => <option key={m} value={m} className="text-gray-800">{m}</option>)}
            </select>
          </div>

          <div className="hidden md:block w-px h-10 bg-white/30" />

          <div className="flex-1 w-full">
            <label className="text-white/70 md:text-black/60 font-bold text-[10px] md:text-xs uppercase tracking-wider mb-1 block">
              Voyageurs
            </label>
            <select
              value={traveler}
              onChange={(e) => setTraveler(e.target.value)}
              className="w-full border border-white/30 md:border-white/40 rounded-lg px-3 py-2.5 text-sm text-white md:text-[var(--night)] font-medium focus:outline-none bg-white/20 md:bg-white/70"
            >
              <option value="" className="text-gray-800">Nombre de voyageurs</option>
              {travelers.map((t) => <option key={t} value={t} className="text-gray-800">{t}</option>)}
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
