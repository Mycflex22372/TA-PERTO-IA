// src/utils/supabase/produtos.ts
'use server'

import  supabase  from '@/utils/supabase/client'

// Função para buscar produtos de uma loja
export async function buscarProdutos(lojaId: number) {
  const { data, error } = await supabase
    .from('produtos')
    .select('*')
    .eq('loja_id', lojaId)

  if (error) throw error
  return data
}

// Função para adicionar produto
export async function adicionarProduto({
  nome,
  preco,
  slug,
  loja_id
}: {
  nome: string
  preco: number
  slug: string
  loja_id: number
}) {
  const { data, error } = await supabase
    .from('produtos')
    .insert([{ nome, preco, slug, loja_id }])

  if (error) throw error
  return data
}

// Função para deletar produto
export async function deletarProduto(produtoId: number) {
  const { error } = await supabase
    .from('produtos')
    .delete()
    .eq('id', produtoId)

  if (error) throw error
}
