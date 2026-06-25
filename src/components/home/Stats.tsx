"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { end: 15, suffix: "+", label: "Années d'expérience" },
  { end: 1200, suffix: "+", label: "Voyageurs satisfaits" },
  { end: 15, suffix: "+", label: "Destinations disponibles" },
  { end: 4.8, suffix: "/5", label: "Note moyenne", decimal: true },
];

function useCountUp(end: number, decimal = false, triggered: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!triggered) return;

    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;

      setCount(decimal ? Math.round(current * 10) / 10 : Math.floor(current));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [triggered, end, decimal]);

  return count;
}

function StatItem({
  end,
  suffix,
  label,
  decimal = false,
  triggered,
}: {
  end: number;
  suffix: string;
  label: string;
  decimal?: boolean;
  triggered: boolean;
}) {
  const count = useCountUp(end, decimal, triggered);

  return (
    <div className="flex flex-col items-center">
      <p className="text-4xl md:text-5xl font-bold text-[var(--sand)] leading-none tracking-tight">
        {decimal ? count.toFixed(1) : count.toLocaleString()}
        <span className="text-2xl md:text-3xl ml-0.5">{suffix}</span>
      </p>
      <p className="text-white/50 text-xs mt-2 font-medium tracking-wider uppercase">
        {label}
      </p>
    </div>
  );
}

export default function Stats() {
  const [triggered, setTriggered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setTriggered(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <section ref={ref} className="relative py-10 md:py-12 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[var(--night)]" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a96e' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 text-center">
        {stats.map((stat) => (
          <StatItem
            key={stat.label}
            {...stat}
            triggered={prefersReducedMotion ? true : triggered}
          />
        ))}
      </div>
    </section>
  );
}