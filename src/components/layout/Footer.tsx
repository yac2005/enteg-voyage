import Link from "next/link";
import { Phone, Mail, MapPin} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--night)] text-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-xl font-bold">Enteg Voyage</h3>
          <p className="text-xs text-[var(--sand)] uppercase tracking-widest mt-1">
            Agence de tourisme
          </p>
          <p className="text-white/60 text-sm mt-4 max-w-xs leading-relaxed">
            Voyages organisés, circuits sur mesure et hébergement authentique à
            travers toute l'Algérie. Partenaire de TADART maison d'hôte.
          </p>

        </div>

        {/* Links */}
        <div>
          <h4 className="text-sm font-semibold text-[var(--sand)] uppercase tracking-wider mb-4">
            Navigation
          </h4>
          <ul className="flex flex-col gap-2 text-sm text-white/60">
            {["Destinations", "Voyages", "Services", "Tadart", "Contact"].map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="hover:text-white transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold text-[var(--sand)] uppercase tracking-wider mb-4">
            Contact
          </h4>
          <ul className="flex flex-col gap-3 text-sm text-white/60">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 shrink-0" />
              +213 XX XX XX XX
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 shrink-0" />
              contact@entegvoyage.dz
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
              Ouargla, Algérie
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 mt-12 pt-6 text-center text-xs text-white/30">
        © {new Date().getFullYear()} Enteg Voyage — Tous droits réservés
      </div>
    </footer>
  );
}