// src/pages/index.tsx

import React, { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [busca, setBusca] = useState("");
  const router = useRouter();

  const handleBuscar = () => {
    if (busca.trim() === "") return;
    router.push(`/buscar?termo=${encodeURIComponent(busca)}`);
  };

  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-br from-blue-900 to-blue-100 text-gray-900 px-4">
      <header className="w-full text-center mt-8">
        <h1 className="text-5xl font-bold text-white drop-shadow-md">TÁ PERTO ✦ IA</h1>
      </header>

      <p className="text-lg mt-6 mb-8 text-center text-white">
        O que você procura em sua cidade?
      </p>

      <div className="w-full max-w-md flex gap-2">
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Ex: Quero achar um tênis em BH"
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
        />
        <button
          onClick={handleBuscar}
          className="px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          Buscar
        </button>
      </div>
    </main>
  );
}
