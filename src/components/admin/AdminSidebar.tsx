"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, Map, Plane, LogOut } from "lucide-react";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/contacts", label: "Contacts", icon: Users },
  { href: "/admin/trips", label: "Voyages", icon: Plane },
  { href: "/admin/destinations", label: "Destinations", icon: Map },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    router.push("/admin");
  };

  return (
    <aside className="w-56 min-h-screen bg-[var(--night)] flex flex-col py-8 px-4">
      <div className="text-center mb-10">
        <p className="text-white font-bold text-lg">ENTEG</p>
        <p className="text-[var(--sand)] text-xs uppercase tracking-widest">Admin</p>
      </div>
      <nav className="flex flex-col gap-1 flex-1">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
              pathname === href
                ? "bg-[var(--sienna)] text-white"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors"
      >
        <LogOut className="w-4 h-4" />
        Déconnexion
      </button>
    </aside>
  );
}