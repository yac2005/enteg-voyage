import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Enteg Voyage",
  description: "Voyages organisés, circuits sur mesure et hébergement authentique en Algérie",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}