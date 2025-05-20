'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { AnimatePresence, motion } from 'framer-motion';
import { Produto } from '@/utils/types/produto';

interface Props {
  produto: Produto;
  onCloseAction : () => void;
  onAtualizadoAction: () => void;
}

const supabase = createClient();

export default function EditarProdutoModal({
  produto,
  onCloseAction,
  onAtualizadoAction,
}: Props) {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');

  useEffect(() => {
    if (produto) {
      setNome(produto.nome);
      setPreco(produto.preco.toString());
    }
  }, [produto]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || preco === '') return;

    const precoNumber = parseFloat(preco);

    const { error } = await supabase
      .from('produtos')
      .update({ nome, preco: precoNumber })
      .eq('id', produto.id);

    if (error) {
      console.error(error);
    } else {
      onAtualizadoAction();
      onCloseAction();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
        >
          <h2 className="text-xl font-bold mb-4">Editar Produto</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Nome do produto"
              className="w-full border rounded p-2"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              type="number"
              placeholder="Preço"
              className="w-full border rounded p-2"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={onCloseAction}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Salvar
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
