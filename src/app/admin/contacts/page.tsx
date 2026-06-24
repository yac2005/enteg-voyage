"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  destination: string;
  message: string;
  createdAt?: { seconds: number };
}

export default function ContactsPage() {
  useAdminAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setContacts(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Contact)));
      setLoading(false);
    }
    fetch();
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold text-[var(--night)] mb-8">Contacts</h1>
        {loading ? (
          <p className="text-gray-400">Chargement...</p>
        ) : contacts.length === 0 ? (
          <p className="text-gray-400">Aucun contact pour l'instant.</p>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[var(--parchment)] text-[var(--night)]">
                <tr>
                  {["Nom", "Email", "Téléphone", "Destination", "Message", "Date"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {contacts.map((c, i) => (
                  <tr key={c.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-3">{c.name}</td>
                    <td className="px-4 py-3">{c.email}</td>
                    <td className="px-4 py-3">{c.phone}</td>
                    <td className="px-4 py-3">{c.destination}</td>
                    <td className="px-4 py-3 max-w-xs truncate">{c.message}</td>
                    <td className="px-4 py-3 text-gray-400">
                      {c.createdAt ? new Date(c.createdAt.seconds * 1000).toLocaleDateString("fr-DZ") : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
