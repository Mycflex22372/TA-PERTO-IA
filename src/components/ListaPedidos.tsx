'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabaseClient';

interface Pedido {
  id: number;
  cliente: string;
  produto: string;
  preco: number;
  status: string;
}

export default function ListaPedidos({ lojaId }: { lojaId: string }) {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const supabase = createClient();

  const fetchPedidos = async () => {
    const { data, error } = await supabase
      .from('pedidos')
      .select('*')
      .eq('loja_id', lojaId)
      .order('id', { ascending: false });

    if (error) console.error('Erro ao buscar pedidos:', error);
    else setPedidos(data || []);
  };

  const concluirPedido = async (id: number) => {
    await supabase.from('pedidos').update({ status: 'Concluído' }).eq('id', id);
    fetchPedidos();
  };

  const excluirPedido = async (id: number) => {
    await supabase.from('pedidos').delete().eq('id', id);
    fetchPedidos();
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">Pedidos</h2>
      <div className="grid gap-4">
        {pedidos.map((pedido) => (
          <div key={pedido.id} className="p-4 border rounded-xl bg-white shadow-sm flex justify-between items-center">
            <div>
              <p className="font-semibold">{pedido.cliente}</p>
              <p>{pedido.produto} — R$ {pedido.preco.toFixed(2)}</p>
              <p className={`text-sm ${pedido.status === 'Concluído' ? 'text-green-600' : 'text-orange-500'}`}>
                Status: {pedido.status}
              </p>
            </div>
            <div className="flex gap-2">
              {pedido.status !== 'Concluído' && (
                <button
                  onClick={() => concluirPedido(pedido.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Concluir
                </button>
              )}
              <button
                onClick={() => excluirPedido(pedido.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
