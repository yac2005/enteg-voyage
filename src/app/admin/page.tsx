"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ADMIN_PASSWORD = "enteg2024";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("admin_auth", "true");
      router.push("/admin/dashboard");
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--parchment)] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[var(--night)]">Enteg Voyage</h1>
          <p className="text-sm text-gray-400 mt-1">Panneau d'administration</p>
        </div>
        <div className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--sienna)]"
          />
          {error && <p className="text-red-500 text-xs">Mot de passe incorrect.</p>}
          <button
            onClick={handleLogin}
            className="w-full bg-[var(--sienna)] text-white text-sm font-semibold py-3 rounded-xl hover:bg-[var(--night)] transition-colors"
          >
            Se connecter
          </button>
        </div>
      </div>
    </div>
  );
}