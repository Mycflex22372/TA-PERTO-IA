import { useState } from "react";
import { useRouter } from "next/router";

export default function BuscaIA() {
  const [etapa, setEtapa] = useState(1);
  const [termo, setTermo] = useState("");
  const [cidade, setCidade] = useState("");
  const router = useRouter();

  const avancar = () => {
    if (etapa === 1 && termo.trim()) {
      setEtapa(2);
    } else if (etapa === 2 && cidade.trim()) {
      router.push(`/buscar?termo=${encodeURIComponent(termo)}&cidade=${encodeURIComponent(cidade)}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg text-black">
      {etapa === 1 && (
        <div>
          <p className="mb-3 text-lg font-semibold">O que você está procurando?</p>
          <input
            type="text"
            placeholder="Ex: camiseta, tênis, boné..."
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            className="w-full px-4 py-2 border rounded-md mb-4"
          />
          <button
            onClick={avancar}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Próximo
          </button>
        </div>
      )}

      {etapa === 2 && (
        <div>
          <p className="mb-3 text-lg font-semibold">Em qual cidade você quer procurar?</p>
          <input
            type="text"
            placeholder="Ex: São Paulo, Macaé..."
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            className="w-full px-4 py-2 border rounded-md mb-4"
          />
          <button
            onClick={avancar}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Buscar
          </button>
        </div>
      )}
    </div>
  );
}
