"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Menu, X, Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { key: "home", href: "/" },
  { key: "destinations", href: "/destinations" },
  { key: "trips", href: "/trips" },
  { key: "services", href: "/services" },
  { key: "tadart", href: "/tadart" },
  { key: "contact", href: "/contact" },
];

const locales = [
  { code: "fr", label: "FR" },
  { code: "ar", label: "AR" },
  { code: "en", label: "EN" },
];

export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const currentLocale = pathname.split("/")[1];

  const switchLocale = (code: string) => {
    const segments = pathname.split("/");
    segments[1] = code;
    router.push(segments.join("/"));
    setLangOpen(false);
  };

  const localizedHref = (href: string) => `/${currentLocale}${href}`;

  const isScrolled = false; // we'll make this dynamic later

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href={localizedHref("/")} className="flex flex-col leading-none">
          <span className="text-xl font-bold text-[var(--night)] tracking-tight">
            Enteg Voyage
          </span>
          <span className="text-xs text-[var(--sienna)] tracking-widest uppercase">
            Agence de tourisme
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.key}
              href={localizedHref(link.href)}
              className="text-sm font-medium text-gray-600 hover:text-[var(--sienna)] transition-colors duration-200"
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">
          {/* Locale switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-[var(--sienna)] transition-colors"
            >
              <Globe className="w-4 h-4" />
              {currentLocale.toUpperCase()}
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-lg py-1 w-20">
                {locales.map((loc) => (
                  <button
                    key={loc.code}
                    onClick={() => switchLocale(loc.code)}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-[var(--parchment)] hover:text-[var(--sienna)] transition-colors"
                  >
                    {loc.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CTA button */}
          <Link
            href={localizedHref("/contact")}
            className="bg-[var(--sienna)] text-white text-sm px-5 py-2 rounded-full font-medium hover:bg-[var(--night)] transition-colors duration-300"
          >
            Devis gratuit
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-[var(--night)]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.key}
              href={localizedHref(link.href)}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-gray-700 hover:text-[var(--sienna)] transition-colors"
            >
              {t(link.key)}
            </Link>
          ))}
          <div className="flex gap-3 pt-2">
            {locales.map((loc) => (
              <button
                key={loc.code}
                onClick={() => switchLocale(loc.code)}
                className="text-xs font-medium text-gray-500 hover:text-[var(--sienna)]"
              >
                {loc.label}
              </button>
            ))}
          </div>
          <Link
            href={localizedHref("/contact")}
            className="bg-[var(--sienna)] text-white text-sm px-5 py-2 rounded-full font-medium text-center"
            onClick={() => setMenuOpen(false)}
          >
            Devis gratuit
          </Link>
        </div>
      )}
    </header>
  );
}