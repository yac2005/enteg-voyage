"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const deals = [
  { text: "Départ Djanet · 15 Août — 3 places restantes", href: "/destinations/djanet" },
  { text: "Offre Été : -10% sur tous les circuits Nord", href: "/destinations" },
  { text: "Nouveau : Circuit Ghardaïa 4 jours · À partir de 45,000 DZD", href: "/destinations/ghardaia" },
  { text: "Location 4x4 disponible cet été — Réservez maintenant", href: "/transport" },
];

export default function DealsTicker() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);

  const go = (dir: number) => {
    setVisible(false);
    setTimeout(() => {
      setCurrent((prev) => (prev + dir + deals.length) % deals.length);
      setVisible(true);
    }, 300);
  };

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => go(1), 4000);
    return () => clearInterval(interval);
  }, [paused]);

  const deal = deals[current];

  return (
    <div
      className="bg-[var(--night)] w-full py-3 px-6 flex items-center justify-between"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Left arrow */}
      <button
        onClick={() => go(-1)}
        className="text-white/40 hover:text-white transition-colors shrink-0"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Message */}
      <div className="flex-1 flex items-center justify-center gap-4">
        <span className="text-xs hidden sm:block select-none text-[var(--sand)]">✦</span>
        <Link
          href={deal.href}
          className={`text-xs uppercase tracking-[0.2em] font-medium text-center transition-opacity duration-300 hover:opacity-70 text-[var(--parchment)] ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          {deal.text}
        </Link>
        <span className="text-xs hidden sm:block select-none text-[var(--sand)]">✦</span>
      </div>

      {/* Right arrow + dots */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="hidden sm:flex items-center gap-1.5">
          {deals.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setVisible(false);
                setTimeout(() => { setCurrent(i); setVisible(true); }, 300);
              }}
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor:
                  i === current ? "#C9A96E" : "rgba(201,169,110,0.3)",
              }}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          className="text-white/40 hover:text-white transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}