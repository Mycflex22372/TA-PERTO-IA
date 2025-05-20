// LojaDashboard.tsx
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { Produto } from '@/utils/types/produto';
import AdicionarProdutoModal from '@/app/dashboard/AdicionarProdutoModal';
import EditarProdutoModal from '@/components/EditarProdutoModal';

interface Loja {
  id: number;
  nome: string;
}

interface Props {
  loja: Loja;
}

export default function LojaDashboard({ loja }: Props) {
  const supabase = createClient();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [mostrarModalAdicionar, setMostrarModalAdicionar] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);

  const carregarProdutos = async () => {
    const { data, error } = await supabase
      .from('produtos')
      .select('*')
      .eq('loja_id', loja.id);

    if (error) console.error(error);
    else setProdutos(data);
  };

  useEffect(() => {
    carregarProdutos();
  }, [loja.id]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Dashboard da Loja</h1>
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setMostrarModalAdicionar(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Adicionar Produto
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="border rounded-xl p-4 shadow hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold">{produto.nome}</h2>
            <p className="text-gray-600">R$ {produto.preco.toFixed(2)}</p>
            <button
              className="mt-2 text-sm text-blue-600 hover:underline"
              onClick={() => setProdutoEditando(produto)}
            >
              Editar
            </button>
          </div>
        ))}
      </div>

      {mostrarModalAdicionar && (
        <AdicionarProdutoModal
          lojaId={loja.id}
          onCloseAction={() => setMostrarModalAdicionar(false)}
          onAdicionadoAction={carregarProdutos}
        />
      )}

      {produtoEditando && (
        <EditarProdutoModal
          produto={produtoEditando}
          onCloseAction={() => setProdutoEditando(null)}
          onAtualizadoAction={carregarProdutos}
        />
      )}
    </div>
  );
}

