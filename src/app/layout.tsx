import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Enteg Voyage",
  description: "Voyages organisés, circuits sur mesure et hébergement authentique en Algérie",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}