'use client';

import { useState } from 'react';

type Props = {
  lojaId: number;
  aberto: boolean;
  aoFecharAction: () => void;
  aoProdutoAdicionadoAction: () => Promise<void>;
};

export default function AdicionarProdutoModal({
  lojaId,
  aberto,
  aoFecharAction,
  aoProdutoAdicionadoAction,
}: Props) {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [slug, setSlug] = useState('');

  const adicionarProduto = async () => {
    if (!nome || !preco || !slug) return alert('Preencha todos os campos');

    const resposta = await fetch('/api/produtos', {
      method: 'POST',
      body: JSON.stringify({
        nome,
        preco: parseFloat(preco),
        slug,
        loja_id: lojaId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (resposta.ok) {
      setNome('');
      setPreco('');
      setSlug('');
      aoProdutoAdicionadoAction(); // função chamada aqui
      aoFecharAction(); // renomeada aqui
    } else {
      alert('Erro ao adicionar produto');
    }
  };

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Adicionar Produto</h2>

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Preço"
          type="number"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded mb-4"
          placeholder="Slug (ex: meu-produto)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button onClick={aoFecharAction} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
            Cancelar
          </button>
          <button onClick={adicionarProduto} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
