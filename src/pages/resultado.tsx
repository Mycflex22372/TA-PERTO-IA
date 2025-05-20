import React from "react";
import Link from "next/link";

const resultadosFake = [
  {
    nome: "Camisa Nike Preta",
    loja: "Loja do João",
    preco: "R$ 129,90",
    whatsapp: "https://wa.me/5581999999999",
    lojaSlug: "loja-do-joao",
  },
  {
    nome: "Camisa Nike Preta",
    loja: "Loja do Mário",
    preco: "R$ 139,90",
    whatsapp: "https://wa.me/5581888888888",
    lojaSlug: "loja-do-mario",
  },
];

export default function ResultadoBusca() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-500 text-white py-12 px-6">
      <h1 className="text-4xl font-bold text-center mb-10">Resultados da Busca</h1>

      <div className="space-y-6 max-w-3xl mx-auto">
        {resultadosFake.map((produto, index) => (
          <div
            key={index}
            className="bg-white bg-opacity-10 p-6 rounded-2xl shadow-lg flex flex-col gap-2"
          >
            <h2 className="text-2xl font-semibold">{produto.nome}</h2>
            <p className="text-lg">Loja: 
              <Link href={`/lojas/${produto.lojaSlug}`} className="text-yellow-300 underline ml-1">
                {produto.loja}
              </Link>
            </p>
            <p className="text-lg">Preço: {produto.preco}</p>
            <a
              href={produto.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition"
            >
              Compre diretamente com o vendedor
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
