export default function Footer() {
  return (
    <footer className="w-full px-6 py-8 border-t text-sm text-muted-foreground text-center">
      © {new Date().getFullYear()} Enteg Voyage — Tous droits réservés
    </footer>
  );
}