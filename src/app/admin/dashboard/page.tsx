"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Users, Plane, Map, MessageSquare } from "lucide-react";

export default function DashboardPage() {
  useAdminAuth();
  const [stats, setStats] = useState({ contacts: 0, trips: 0, destinations: 0 });

  useEffect(() => {
    async function fetchStats() {
      const [contacts, trips, destinations] = await Promise.all([
        getDocs(collection(db, "contacts")),
        getDocs(collection(db, "trips")),
        getDocs(collection(db, "destinations")),
      ]);
      setStats({
        contacts: contacts.size,
        trips: trips.size,
        destinations: destinations.size,
      });
    }
    fetchStats();
  }, []);

  const cards = [
    { label: "Contacts reçus", value: stats.contacts, icon: MessageSquare },
    { label: "Voyages", value: stats.trips, icon: Plane },
    { label: "Destinations", value: stats.destinations, icon: Map },
  ];

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold text-[var(--night)] mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {cards.map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-4">
              <div className="bg-[var(--parchment)] p-3 rounded-xl">
                <Icon className="w-6 h-6 text-[var(--sienna)]" />
              </div>
              <div>
                <p className="text-3xl font-bold text-[var(--night)]">{value}</p>
                <p className="text-sm text-gray-400 mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}