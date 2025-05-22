import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/utils/types/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

type ProdutoComLoja = {
  id: number;
  nome: string;
  preco: number;
  slug: string;
  loja: {
    nome: string;
    slug: string;
    whatsapp: string;
  } | null;
};

export default async function ProdutoPage({ params }: PageProps) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: produto } = await supabase
    .from("produtos")
    .select("id, nome, preco, slug, loja (nome, slug, whatsapp)")
    .eq("slug", params.slug)
    .single<ProdutoComLoja>();

  if (!produto) {
    return notFound(); // melhor UX do que apenas <div>Produto não encontrado</div>
  }

  const { nome, preco, loja } = produto;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{nome}</h1>
      <p className="text-lg text-gray-700 mb-2">Preço: R$ {preco}</p>

      {loja && (
        <>
          <p className="text-md text-gray-600 mb-2">
            Loja:{" "}
            <Link
              href={`/loja/${loja.slug}`}
              className="text-blue-600 underline"
            >
              {loja.nome}
            </Link>
          </p>

          <a
            href={`https://wa.me/${loja.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded"
          >
            Compre diretamente com o vendedor
          </a>
        </>
      )}
    </div>
  );
}

