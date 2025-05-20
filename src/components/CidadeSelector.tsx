import { useState } from "react";
import { useRouter } from "next/router";

const cidadesDisponiveis = ["sao paulo", "rio de janeiro", "belo horizonte"];

export default function CidadeSelector() {
  const [cidade, setCidade] = useState("");
  const [mensagem, setMensagem] = useState("");
  const router = useRouter();

  const normalizar = (texto: string) => {
    return texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // remove acentos
      .toLowerCase()
      .trim();
  };

  const handleSubmit = () => {
    const cidadeNormalizada = normalizar(cidade);

    if (cidadesDisponiveis.includes(cidadeNormalizada)) {
      // Redireciona automaticamente
      router.push(`/cidade/${cidadeNormalizada.replace(/ /g, "-")}`);
    } else {
      setMensagem(`Ainda não temos catálogos em ${cidade}. Em breve!`);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="text"
        placeholder="Digite sua cidade"
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
        className="p-2 rounded bg-gray-800 text-white"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Buscar catálogo
      </button>
      {mensagem && <p className="mt-2">{mensagem}</p>}
    </div>
  );
}
