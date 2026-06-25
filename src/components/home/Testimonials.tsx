"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    name: "fute_450788",
    role: "TripAdvisor · Août 2016",
    rating: 4,
    text: "Hôtel splendide dans sa conception, les chambres simples et confortables. L'hôtel est situé dans un cadre de propreté exemplaire avec un professionnalisme remarquable dans la prestation de services.",
    avatar: "/pfp/fute.jpg",
  },
  {
    name: "samarkand",
    role: "TripAdvisor · Mars 2011",
    rating: 4,
    text: "Accueil chaleureux et un réel souci de combler les vœux du client. La maison d'hôtes d'une beauté dépouillée est un havre de paix et de lumière, très propre.",
    avatar: "/pfp/samarkand.jpg",
  },
  {
    name: "ana_sahraouia",
    role: "Instagram · 2024",
    rating: 5,
    text: "Magnifique Ghardaïa... À découvrir avec l'agence Enteg. Une destination qui laisse sans voix, un voyage dont on garde le souvenir longtemps.",
    avatar: "/pfp/ana.jpg",
  },
  {
    name: "Voyageur anonyme",
    role: "Google · 2024",
    rating: 5,
    text: "Une expérience inoubliable au cœur du Sahara algérien. L'équipe d'Enteg Voyages s'occupe de tout avec professionnalisme et passion.",
    avatar: null,
  },
  {
    name: "fute_450788",
    role: "TripAdvisor · Août 2016",
    rating: 4,
    text: "Avis positifs : tout le monde a convenu sur leur hôtel tout simplement remarquable — admiration pour la propreté, l'emplacement et la qualité des hôtes.",
    avatar: "/pfp/fute.jpg",
  },
  {
    name: "samarkand",
    role: "TripAdvisor · Mars 2011",
    rating: 3,
    text: "La maison d'hôtes de Beni Isguen est un havre de paix. Les repas sont corrects, et la tranquillité des lieux est apaisante. La ballade est bien agréable.",
    avatar: "/pfp/samarkand.jpg",
  },
];

const row = [...testimonials, ...testimonials];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          className={i <= count ? "text-[var(--sand)]" : "text-[var(--sand)]/20"}
          fill={i <= count ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <polygon points="7,1 8.8,5.2 13.3,5.6 10.1,8.4 11.1,12.8 7,10.4 2.9,12.8 3.9,8.4 0.7,5.6 5.2,5.2" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ src, name }: { src: string | null; name: string }) {
  const initials = name.slice(0, 2).toUpperCase();
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--sand)] to-[#8B6914] flex items-center justify-center text-[13px] font-bold text-[var(--night)] flex-shrink-0">
        {initials}
      </div>
    );
  }

  return (
    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-[var(--parchment)]">
      <Image
        src={src}
        alt={name}
        fill
        className="object-cover"
        onError={() => setError(true)}
      />
    </div>
  );
}

function TestimonialCard({ item }: { item: (typeof testimonials)[0] }) {
  return (
    <div className="w-[380px] flex-shrink-0 bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-4 shadow-sm hover:shadow-md hover:border-[var(--sand)]/30 transition-all duration-300">
      {/* Quote mark */}
      <svg width="24" height="18" viewBox="0 0 24 18" fill="none" className="text-[var(--sand)]/40">
        <path
          d="M0 18V10.8C0 7.2 1.2 4.2 3.6 1.8L5.4 0l2.4 1.8C6.6 3 5.7 4.5 5.4 6.6H9V18H0zm12 0V10.8c0-3.6 1.2-6.6 3.6-9L17.4 0l2.4 1.8C18.6 3 17.7 4.5 17.4 6.6H21V18H12z"
          fill="currentColor"
        />
      </svg>

      {/* Quote text */}
      <p className="text-gray-600 text-sm leading-relaxed flex-1">
        {item.text}
      </p>

      {/* Footer */}
      <div className="flex items-center gap-3 pt-3 border-t border-gray-50">
        <Avatar src={item.avatar} name={item.name} />
        <div className="min-w-0">
          <div className="text-[var(--night)] font-semibold text-sm truncate">
            {item.name}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <Stars count={item.rating} />
            <span className="text-gray-400 text-xs whitespace-nowrap">
              {item.role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section className="py-24 bg-[var(--parchment)] overflow-hidden">
      {/* Header */}
      <div className="text-center mb-14 px-6">
        <span className="text-xs uppercase tracking-[0.3em] text-[var(--sienna)] font-medium">
          Ce qu'ils disent
        </span>
        <h2 className="text-[var(--night)] text-3xl md:text-4xl font-bold mt-3 max-w-lg mx-auto leading-tight">
          Des mots sincères sur <span className="text-[var(--sienna)]">nos voyages</span>.
        </h2>
      </div>

      {/* Single marquee row */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--parchment)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--parchment)] to-transparent z-10 pointer-events-none" />
        <div
          className="flex gap-5"
          style={{
            animation: prefersReducedMotion ? "none" : "marquee 50s linear infinite",
            width: "max-content",
          }}
        >
          {row.map((item, i) => (
            <TestimonialCard key={i} item={item} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}