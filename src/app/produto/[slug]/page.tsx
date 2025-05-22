import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Versão super simplificada sem tipagens complexas
export default async function ProdutoPage({ params }: any) {
  const supabase = createServerComponentClient({ cookies });
  
  const { data: produto } = await supabase
    .from("produtos")
    .select("id, nome, preco, descricao, slug, loja_id, lojas(id, nome, slug)")
    .eq("slug", params.slug)
    .single();

  if (!produto) {
    return <div>Produto não encontrado.</div>;
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">{produto.nome}</h1>
      <p className="mb-2">Preço: R${produto.preco?.toFixed(2)}</p>
      {produto.descricao && (
        <p className="mb-4">{produto.descricao}</p>
      )}
// Substitua a parte problemática (linhas 25-35 aproximadamente)
{produto.lojas && (
  <div className="mt-4">
    <p>Vendido por: 
      <a 
        href={`/loja/${produto.lojas?.slug || ''}`} 
        className="text-blue-600 underline ml-1"
      >
        {produto.lojas?.nome || 'Loja'}
      </a>
    </p>
  </div>
)}

    </main>
  );
}


