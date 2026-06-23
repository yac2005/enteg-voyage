import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg1.jpg')" }}
      />
      <div className="absolute inset-0 bg-[var(--night)]/80" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <span className="text-sm uppercase tracking-widest text-[var(--sand)] font-medium">
          Voyage sur mesure
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 leading-tight">
          Votre prochain voyage commence ici
        </h2>
        <p className="text-white/70 mt-4 text-lg max-w-xl mx-auto">
          Dites-nous où vous voulez aller, on s'occupe de tout. Visa, transport,
          hébergement et guide inclus.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            href="/trips"
            className="bg-[var(--sienna)] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[var(--sand)] hover:text-[var(--night)] transition-colors duration-300"
          >
            Voir nos voyages
          </Link>
          <Link
            href="/contact"
            className="border border-white text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-white hover:text-[var(--night)] transition-colors duration-300"
          >
            Demander un devis
          </Link>
        </div>
      </div>
    </section>
  );
}