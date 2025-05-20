'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabase/client';

interface FormularioProdutoProps {
  lojaId: number;
  onProdutoAdicionado?: () => void; // <- essa linha é o segredo
}

export default function FormularioProduto({
  lojaId,
  onProdutoAdicionado,
}: FormularioProdutoProps) {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');

    if (!nome || !preco) {
      setErro('Preencha todos os campos');
      setCarregando(false);
      return;
    }

    const { error } = await supabase.from('produtos').insert([
      {
        nome,
        preco: Number(preco),
        loja_id: lojaId,
      },
    ]);

    if (error) {
      setErro('Erro ao adicionar produto');
    } else {
      setNome('');
      setPreco('');
      if (onProdutoAdicionado) {
        onProdutoAdicionado(); // <- aqui é chamado corretamente
      }
    }

    setCarregando(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {erro && <p className="text-red-500">{erro}</p>}
      <div>
        <label className="block text-sm font-medium">Nome do produto</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Preço</label>
        <input
          type="number"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={carregando}
      >
        {carregando ? 'Salvando...' : 'Adicionar Produto'}
      </button>
    </form>
  );
}
