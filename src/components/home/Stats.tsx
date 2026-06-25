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
    const duration = 1800;
    const steps = 60;
    const increment = end / steps;
    const interval = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(decimal ? Math.round(start * 10) / 10 : Math.floor(start));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [triggered, end, decimal]);

  return count;
}

function StatItem({ end, suffix, label, decimal = false, triggered }: {
  end: number; suffix: string; label: string; decimal?: boolean; triggered: boolean;
}) {
  const count = useCountUp(end, decimal, triggered);
  return (
    <div>
      <p className="text-4xl font-bold text-[var(--sand)]">
        {decimal ? count.toFixed(1) : count}{suffix}
      </p>
      <p className="text-white/60 text-sm mt-2">{label}</p>
    </div>
  );
}

export default function Stats() {
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-[var(--night)]/70 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <StatItem key={stat.label} {...stat} triggered={triggered} />
        ))}
      </div>
    </section>
  );
}