"use client";

import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image placeholder — replace src with real image later */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto gap-6">
        <span className="text-sm uppercase tracking-widest text-[var(--sand)] font-medium">
          Enteg Voyage
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          {t("tagline")}
        </h1>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl">
          {t("subtitle")}
        </p>
        
        {/* Search bar — Now safely inside the content wrapper */}
        <div className="w-full max-w-2xl flex"></div>
      </div> {/* <-- Moved this closing div here */}
    </section>
  );
}