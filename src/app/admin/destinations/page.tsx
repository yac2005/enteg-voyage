"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Trash2, Plus } from "lucide-react";

interface Destination {
  id: string;
  name: string;
  region: string;
  description: string;
}

const empty = { name: "", region: "", description: "" };

export default function DestinationsPage() {
  useAdminAuth();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [form, setForm] = useState(empty);
  const [adding, setAdding] = useState(false);

  async function fetchDestinations() {
    const snap = await getDocs(collection(db, "destinations"));
    setDestinations(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Destination)));
  }

  useEffect(() => { fetchDestinations(); }, []);

  const handleAdd = async () => {
    if (!form.name) return;
    setAdding(true);
    await addDoc(collection(db, "destinations"), { ...form, createdAt: serverTimestamp() });
    setForm(empty);
    await fetchDestinations();
    setAdding(false);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "destinations", id));
    setDestinations((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold text-[var(--night)] mb-8">Destinations</h1>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h2 className="text-sm font-semibold text-[var(--night)] mb-4 uppercase tracking-wider">Ajouter une destination</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "name", placeholder: "Nom" },
              { name: "region", placeholder: "Région" },
              { name: "description", placeholder: "Description" },
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

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[var(--parchment)]">
              <tr>
                {["Nom", "Région", "Description", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-semibold text-[var(--night)]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {destinations.map((d, i) => (
                <tr key={d.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-3">{d.name}</td>
                  <td className="px-4 py-3">{d.region}</td>
                  <td className="px-4 py-3">{d.description}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete(d.id)} className="text-red-400 hover:text-red-600 transition-colors">
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
