"use client";

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

// Duplicate for seamless loop
const row1 = [...testimonials, ...testimonials];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill={i <= count ? "var(--sand)" : "none"}
          stroke={i <= count ? "var(--sand)" : "rgba(201,169,110,0.3)"}
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
  if (!src) {
    return (
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--sand), #8B6914)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
          fontWeight: 700,
          color: "var(--night)",
          flexShrink: 0,
        }}
      >
        {initials}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={name}
      onError={(e) => {
        const el = e.currentTarget as HTMLImageElement;
        el.style.display = "none";
        const fallback = el.nextElementSibling as HTMLElement;
        if (fallback) fallback.style.display = "flex";
      }}
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        objectFit: "cover",
        flexShrink: 0,
      }}
    />
  );
}

function TestimonialCard({
  item,
}: {
  item: (typeof testimonials)[0];
}) {
  return (
    <div
      style={{
        width: 320,
        flexShrink: 0,
        background: "rgba(10,8,5,0.75)",
        border: "1px solid rgba(201,169,110,0.18)",
        borderRadius: 16,
        padding: "24px 24px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        marginRight: 20,
      }}
    >
      {/* Quote mark */}
      <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
        <path
          d="M0 18V10.8C0 7.2 1.2 4.2 3.6 1.8L5.4 0l2.4 1.8C6.6 3 5.7 4.5 5.4 6.6H9V18H0zm12 0V10.8c0-3.6 1.2-6.6 3.6-9L17.4 0l2.4 1.8C18.6 3 17.7 4.5 17.4 6.6H21V18H12z"
          fill="var(--sand)"
          opacity="0.5"
        />
      </svg>

      <p
        style={{
          color: "rgba(255,255,255,0.82)",
          fontSize: 14,
          lineHeight: 1.65,
          fontWeight: 300,
          flex: 1,
        }}
      >
        {item.text}
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
        <Avatar src={item.avatar} name={item.name} />
        <div style={{ display: "none" /* fallback placeholder */ }} />
        <div>
          <div
            style={{
              color: "#fff",
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: "0.01em",
            }}
          >
            {item.name}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 3 }}>
            <Stars count={item.rating} />
            <span
              style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: 11,
                letterSpacing: "0.05em",
              }}
            >
              {item.role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      style={{
        background: "rgba(201,169,110,0.08)",
        paddingTop: 96,
        paddingBottom: 96,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 56, padding: "0 24px" }}>
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--sand)",
            fontWeight: 500,
          }}
        >
          Ce qu'ils disent
        </span>
        <h2
          style={{
            color: "var(--sand)",
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 700,
            lineHeight: 1.2,
            marginTop: 12,
            maxWidth: 560,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Des mots sincères sur{" "}
          <span style={{ color: "var(--sand)" }}>nos voyages</span>.
        </h2>
      </div>

      {/* Row 1 — left to right */}
      <div style={{ position: "relative" }}>
        {/* Fade edges */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 80,
            background: "linear-gradient(to right, rgba(201,169,110,0.08), transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 80,
            background: "linear-gradient(to left, rgba(201,169,110,0.08), transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            display: "flex",
            animation: "marquee-ltr 40s linear infinite",
            width: "max-content",
          }}
        >
          {row1.map((item, i) => (
            <TestimonialCard key={i} item={item} />
          ))}
        </div>
      </div>



      <style>{`
        @keyframes marquee-ltr {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-rtl {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="marquee"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}