import { useState } from "react";
import { useRouter } from "next/router";

export default function SearchBar() {
  const [busca, setBusca] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const cidade = "Campos-do-Goitacases"; // depois vai ser dinâmico
    router.push(`/cidade/${cidade}?busca=${encodeURIComponent(busca)}`);
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="O que você procura?"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="p-2 rounded text-black w-64"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Buscar
      </button>
    </div>
  );
}
