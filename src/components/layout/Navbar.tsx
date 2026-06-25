"use client";

import DealsTicker from "@/components/home/DealsTicker";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User } from "lucide-react";
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

  const leftLinks = links.slice(0, 3);
  const rightLinks = links.slice(3);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      {/* Desktop Design */}
      <div className="max-w-7xl mx-auto px-6 h-24 hidden md:flex items-center justify-between relative">
        
        {/* Invisible spacer to perfectly balance the right-side CTA and keep center truly centered */}
        <div className="w-[240px] invisible lg:block" aria-hidden="true"></div>

        {/* Center Group: Links hugging the logo tightly */}
        <div className="flex items-center gap-12 mx-auto">
          {/* Left Side Links */}
          <nav className="flex items-center gap-8">
            {leftLinks.map((link) => (
              <Link
                key={link.key}
                href={localizedHref(link.href)}
                className="text-sm font-bold text-slate-700 hover:text-[var(--sienna)] transition-colors duration-200 tracking-wide whitespace-nowrap"
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          {/* Centered Logo */}
          <Link href={localizedHref("/")} className="relative w-20 h-20 shrink-0">
            <Image
              src="/images/logo.jpg"
              alt="Enteg Voyage"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Right Side Links */}
          <nav className="flex items-center gap-8">
            {rightLinks.map((link) => (
              <Link
                key={link.key}
                href={localizedHref(link.href)}
                className="text-sm font-bold text-slate-700 hover:text-[var(--sienna)] transition-colors duration-200 tracking-wide whitespace-nowrap"
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Actions: Pulled completely to the edge */}
        <div className="flex items-center gap-6 min-w-[240px] justify-end">
          {/* Locale switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-xs font-bold text-[#b07018] tracking-wider uppercase transition-colors"
            >
              <User className="w-4 h-4 text-[#b07018]" />
              <span>{currentLocale.toUpperCase()}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-100 rounded-lg shadow-lg py-1 w-20 z-50">
                {locales.map((loc) => (
                  <button
                    key={loc.code}
                    onClick={() => switchLocale(loc.code)}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 hover:text-[#b07018] transition-colors"
                  >
                    {loc.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Request Quote Button */}
          <Link
            href={localizedHref("/contact")}
            className="bg-[#b07018] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-lg hover:bg-opacity-90 transition-colors duration-300"
          >
            CONTACT
          </Link>
        </div>
      </div>

      {/* Mobile Design Header */}
      <div className="md:hidden flex items-center justify-between px-6 py-4">
        <Link href={localizedHref("/")} className="relative w-16 h-16">
          <Image
            src="/images/logo.jpg"
            alt="Enteg Voyage"
            fill
            className="object-contain"
          />
        </Link>
        <button
          className="text-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 shadow-inner">
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
          <div className="flex gap-3 pt-2 border-t border-gray-100">
            {locales.map((loc) => (
              <button
                key={loc.code}
                onClick={() => switchLocale(loc.code)}
                className={`text-xs font-bold px-2 py-1 rounded ${
                  currentLocale === loc.code ? "bg-[#b07018] text-white" : "text-gray-500"
                }`}
              >
                {loc.label}
              </button>
            ))}
          </div>
          <Link
            href={localizedHref("/contact")}
            className="bg-[#b07018] text-white text-sm font-bold uppercase tracking-wider py-3 rounded-md text-center"
            onClick={() => setMenuOpen(false)}
          >
            Devis gratuit
          </Link>
        </div>
      )}
      <DealsTicker />
    </header>
  );
}