import React from 'react';
import Link from 'next/link';

const resultadosExemplo = [
  {
    nome: 'Camisa Nike Preta',
    preco: 'R$ 129,90',
    loja: 'Loja do João',
    lojaSlug: 'loja-do-joao',
    whatsapp: '5591999999999',
  },
  {
    nome: 'Camisa Nike Preta',
    preco: 'R$ 135,00',
    loja: 'Loja do Renato',
    lojaSlug: 'loja-do-renato',
    whatsapp: '5591888888888',
  },
];

export default function PaginaBusca() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-400 text-white py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Resultados da busca</h1>

      <div className="grid gap-6 max-w-3xl mx-auto">
        {resultadosExemplo.map((produto, index) => (
          <div
            key={index}
            className="bg-white text-black rounded-2xl shadow-lg p-6 flex flex-col gap-2"
          >
            <h2 className="text-xl font-semibold">{produto.nome}</h2>
            <p className="text-gray-700">Preço: {produto.preco}</p>
            <Link
              href={`/lojas/${produto.lojaSlug}`}
              className="text-blue-700 underline font-medium"
            >
              {produto.loja}
            </Link>
            <a
              href={`https://wa.me/${produto.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
            >
              Compre diretamente com o vendedor
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
