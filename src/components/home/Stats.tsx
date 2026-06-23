const stats = [
  { value: "15+", label: "Années d'expérience" },
  { value: "1200+", label: "Voyageurs satisfaits" },
  { value: "15+", label: "Destinations disponibles" },
  { value: "4.8/5", label: "Note moyenne" },
];

export default function Stats() {
  return (
    <section className="bg-[var(--night)] py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-4xl font-bold text-[var(--sand)]">{stat.value}</p>
            <p className="text-white/60 text-sm mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}