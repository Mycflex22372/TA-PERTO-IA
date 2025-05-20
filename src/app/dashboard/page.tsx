'use client'

import { useEffect, useState } from 'react'
import supabase from "@/utils/supabase/client";

import AdicionarProdutoModal from './AdicionarProdutoModal'
import { Database } from '@/utils/types/supabase'
import { createClient } from '@supabase/supabase-js';

type Produto = Database['public']['Tables']['produtos']['Row']
type Loja = Database['public']['Tables']['lojas']['Row']

export default function Dashboard() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loja, setLoja] = useState<Loja | null>(null)
  const [modalAberto, setModalAberto] = useState(false)

  const lojaId = 1 // Fixo por enquanto

  
  const buscarProdutos = async () => {
    const { data: lojaData } = await supabase
      .from('lojas')
      .select('*')
      .eq('id', lojaId)
      .single()

    const { data: produtosData } = await supabase
      .from('produtos')
      .select('*')
      .eq('loja_id', lojaId)

    setLoja(lojaData)
    setProdutos(produtosData || [])
  }

  useEffect(() => {
    buscarProdutos()
  }, [])

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard da Loja</h1>

      {loja && (
        <div className="mb-6">
          <p className="text-lg">
            <strong>Nome:</strong> {loja.nome}
          </p>
          <p className="text-lg">
            <strong>Cidade:</strong> {loja.cidade}
          </p>
        </div>
      )}

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => setModalAberto(true)}
      >
        Adicionar Produto
      </button>

      <AdicionarProdutoModal
        lojaId={lojaId}
        aberto={modalAberto}
        aoFecharAction={() => setModalAberto(false)}
        aoProdutoAdicionadoAction={buscarProdutos}
      />
    </div>
  )
}
