"use client";
import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async () => {
  setLoading(true);
  setError(null);
  try {
    const docRef = await addDoc(collection(db, "contacts"), {
      ...form,
      createdAt: serverTimestamp(),
    });
    console.log("Written with ID:", docRef.id);
    setSent(true);
  } catch (err) {
    console.error("Firebase error:", err);
    setError("Une erreur est survenue. Veuillez réessayer.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="pt-24 pb-20">
      <div className="bg-[var(--parchment)] py-16 px-6 text-center">
        <span className="text-sm uppercase tracking-widest text-[var(--sienna)] font-medium">
          Parlons de votre voyage
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mt-2 text-[var(--night)]">
          Contactez-nous
        </h1>
        <p className="text-gray-500 mt-4 max-w-xl mx-auto">
          Une question, un projet de voyage ? Notre équipe vous répond dans les 24h.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact info */}
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-lg font-bold text-[var(--night)] mb-4">Nos coordonnées</h2>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3 text-sm text-gray-600">
                <Phone className="w-5 h-5 text-[var(--sienna)] shrink-0" />
                +213 XX XX XX XX
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-600">
                <Mail className="w-5 h-5 text-[var(--sienna)] shrink-0" />
                contact@entegvoyage.dz
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <MapPin className="w-5 h-5 text-[var(--sienna)] shrink-0 mt-0.5" />
                Ouargla, Algérie
              </li>
            </ul>
          </div>
          <div className="bg-[var(--parchment)] rounded-2xl p-5">
            <p className="text-sm font-semibold text-[var(--night)] mb-1">Horaires</p>
            <p className="text-sm text-gray-500">Dimanche – Jeudi : 8h – 18h</p>
            <p className="text-sm text-gray-500">Samedi : 9h – 13h</p>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          {sent ? (
            <div className="bg-[var(--parchment)] rounded-2xl p-10 text-center">
              <div className="text-4xl mb-4">✉️</div>
              <p className="text-2xl font-bold text-[var(--night)]">Message envoyé !</p>
              <p className="text-gray-500 mt-2">Notre équipe vous contactera dans les 24h.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Nom complet</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Votre nom"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--sienna)]" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="votre@email.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--sienna)]" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Téléphone</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+213 XX XX XX XX"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--sienna)]" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Destination souhaitée</label>
                  <select name="destination" value={form.destination} onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--sienna)] bg-white">
                    <option value="">Choisir une destination</option>
                    <option>Djanet & Tassili</option>
                    <option>Ghardaïa & M'Zab</option>
                    <option>Taghit & Béchar</option>
                    <option>Oran</option>
                    <option>Constantine</option>
                    <option>Tlemcen</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Message</label>
                <textarea name="message" value={form.message} onChange={handleChange}
                  placeholder="Décrivez votre projet de voyage..." rows={5}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--sienna)] resize-none" />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-[var(--sienna)] text-white text-sm font-semibold py-4 rounded-xl hover:bg-[var(--night)] transition-colors duration-300 uppercase tracking-wider disabled:opacity-60"
              >
                {loading ? "Envoi en cours..." : "Envoyer le message"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}