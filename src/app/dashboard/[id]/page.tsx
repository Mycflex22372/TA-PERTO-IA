'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import  supabase  from '@/utils/supabase/client'
import AdicionarProdutoModal from '@/app/dashboard/AdicionarProdutoModal'

interface Loja {
  id: number
  nome: string
}

export default function DashboardPage() {
  const params = useParams()
  const lojaId = Number(Array.isArray(params?.id) ? params.id[0] : params?.id)

  const [loja, setLoja] = useState<Loja | null>(null)
  const [modalAberto, setModalAberto] = useState(false)

  useEffect(() => {
    async function carregarLoja() {
      const { data, error } = await supabase
        .from('lojas')
        .select('id, nome')
        .eq('id', lojaId)
        .single()

      if (error) {
        console.error('Erro ao carregar loja:', error)
      } else {
        setLoja(data)
      }
    }

    if (lojaId) {
      carregarLoja()
    }
  }, [lojaId])

  async function aoProdutoAdicionadoAction() {
    // Recarregar dados ou mostrar mensagem se quiser
    console.log('Produto adicionado com sucesso')
  }

  function aoFecharAction() {
    setModalAberto(false)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Painel da loja {loja?.nome ?? '(carregando...)'}
      </h1>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => setModalAberto(true)}
      >
        Adicionar novo produto
      </button>

      <AdicionarProdutoModal
        lojaId={lojaId}
        aberto={modalAberto}
        aoFecharAction={aoFecharAction}
        aoProdutoAdicionadoAction={aoProdutoAdicionadoAction}
      />
    </div>
  )
}
