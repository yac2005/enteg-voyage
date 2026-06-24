"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Trash2, Plus } from "lucide-react";

interface Trip {
  id: string;
  title: string;
  destination: string;
  duration: string;
  price: string;
}

const empty = { title: "", destination: "", duration: "", price: "" };

export default function TripsPage() {
  useAdminAuth();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [form, setForm] = useState(empty);
  const [adding, setAdding] = useState(false);

  async function fetchTrips() {
    const snap = await getDocs(collection(db, "trips"));
    setTrips(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Trip)));
  }

  useEffect(() => { fetchTrips(); }, []);

  const handleAdd = async () => {
    if (!form.title) return;
    setAdding(true);
    await addDoc(collection(db, "trips"), { ...form, createdAt: serverTimestamp() });
    setForm(empty);
    await fetchTrips();
    setAdding(false);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "trips", id));
    setTrips((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold text-[var(--night)] mb-8">Voyages</h1>

        {/* Add form */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h2 className="text-sm font-semibold text-[var(--night)] mb-4 uppercase tracking-wider">Ajouter un voyage</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "title", placeholder: "Titre" },
              { name: "destination", placeholder: "Destination" },
              { name: "duration", placeholder: "Durée (ex: 7 jours)" },
              { name: "price", placeholder: "Prix (ex: 65,000 DZD)" },
            ].map(({ name, placeholder }) => (
              <input
                key={name}
                placeholder={placeholder}
                value={form[name as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[var(--sienna)]"
              />
            ))}
          </div>
          <button
            onClick={handleAdd}
            disabled={adding}
            className="mt-4 flex items-center gap-2 bg-[var(--sienna)] text-white text-sm px-5 py-2.5 rounded-xl hover:bg-[var(--night)] transition-colors disabled:opacity-60"
          >
            <Plus className="w-4 h-4" /> Ajouter
          </button>
        </div>

        {/* List */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[var(--parchment)]">
              <tr>
                {["Titre", "Destination", "Durée", "Prix", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-semibold text-[var(--night)]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {trips.map((t, i) => (
                <tr key={t.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-3">{t.title}</td>
                  <td className="px-4 py-3">{t.destination}</td>
                  <td className="px-4 py-3">{t.duration}</td>
                  <td className="px-4 py-3">{t.price}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete(t.id)} className="text-red-400 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
