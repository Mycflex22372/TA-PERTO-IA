import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Versão super simplificada sem tipagens complexas
export default async function LojaPage({ params }: any) {
  const supabase = createServerComponentClient({ cookies });
  
  const { data: loja } = await supabase
    .from("lojas")
    .select("id, nome, slug, whatsapp, cidade, produtos (id, nome, preco, slug)")
    .eq("slug", params.slug)
    .single();

  if (!loja) {
    return <div>Loja não encontrada.</div>;
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">{loja.nome}</h1>
      <p className="mb-2">Cidade: {loja.cidade}</p>
      <a
        href={`https://wa.me/${loja.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-600 underline"
      >
        Falar com a loja no WhatsApp
      </a>

      <h2 className="text-xl font-semibold mt-6 mb-2">Produtos disponíveis</h2>
      {loja.produtos && loja.produtos.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
       ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {loja.produtos && loja.produtos.map((produto: any) => (
            <li key={produto.id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{produto.nome}</h3>
              <p>Preço: R${produto.preco.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

