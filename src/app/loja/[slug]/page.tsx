import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { Database } from "@/utils/types/supabase";

type LojaComProdutos = Database["public"]["Tables"]["lojas"]["Row"] & {
  produtos: {
    id: number;
    nome: string;
    preco: number;
    slug: string;
  }[];
};

export default async function LojaPage({ params }: { params: { slug: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: loja, error } = await supabase
    .from("lojas")
    .select("id, nome, slug, whatsapp, cidade, produtos (id, nome, preco, slug)")
    .eq("slug", params.slug)
    .single<LojaComProdutos>();

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
      {loja.produtos.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        <ul className="space-y-2">
          {loja.produtos.map((produto) => (
            <li key={produto.id} className="border p-4 rounded">
              <h3 className="text-lg font-medium">{produto.nome}</h3>
              <p>Preço: R$ {produto.preco}</p>
              <Link
                href={`/produto/${produto.slug}`}
                className="text-blue-600 underline"
              >
                Ver produto
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
