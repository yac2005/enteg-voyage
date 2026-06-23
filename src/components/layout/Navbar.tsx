"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Navbar() {
  const t = useTranslations("nav");

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between border-b">
      <span className="font-semibold text-lg">Enteg Voyage</span>
      <ul className="flex gap-6 text-sm">
        <li><Link href="/">{t("home")}</Link></li>
        <li><Link href="/destinations">{t("destinations")}</Link></li>
        <li><Link href="/trips">{t("trips")}</Link></li>
        <li><Link href="/services">{t("services")}</Link></li>
        <li><Link href="/tadart">{t("tadart")}</Link></li>
        <li><Link href="/contact">{t("contact")}</Link></li>
      </ul>
    </nav>
  );
}