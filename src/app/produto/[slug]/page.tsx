import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/utils/types/supabase";
import Link from "next/link";

type ProdutoComLoja = {
  id: number;
  nome: string;
  preco: number;
  loja: {
    nome: string;
    slug: string;
    whatsapp: string;
  } | null;
};

export default async function ProdutoPage({ params }: { params: { slug: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: produto, error } = await supabase
    .from("produtos")
    .select("id, nome, preco, loja:lojas (nome, slug, whatsapp)")
    .eq("slug", params.slug)
    .single();

  if (error || !produto) {
    return <div className="p-6 text-red-600">Produto não encontrado 😢</div>;
  }

  const loja = produto.loja;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex flex-col items-center justify-center px-4 py-10">
      <div className="bg-white text-black rounded-2xl shadow-xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2">{produto.nome}</h1>
        <p className="text-lg font-semibold mb-4">R$ {produto.preco.toFixed(2)}</p>

        {loja ? (
          <>
            <p className="mb-2">Loja: <strong>{loja.nome}</strong></p>

            <Link
              href={`/loja/${loja.slug}`}
              className="text-blue-600 underline mb-4 inline-block"
            >
              Ver loja
            </Link>

            <a
              href={`https://wa.me/${loja.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-xl transition"
            >
              Compre diretamente com o vendedor
            </a>
          </>
        ) : (
          <p className="text-sm text-gray-500">Loja não encontrada</p>
        )}
      </div>
    </div>
  );
}
