import Link from "next/link";

interface ResultadoBuscaProps {
  resultados: { id: number; nome: string; produtos: string[] }[];
  termoBusca: string;
}

export default function ResultadoBusca({ resultados, termoBusca }: ResultadoBuscaProps) {
  if (!termoBusca) {
    return null;
  }

  if (resultados.length === 0) {
    return (
      <div className="text-center mt-4 text-red-500">
        Nenhum resultado encontrado para "{termoBusca}".
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      {resultados.map((loja) => (
        <div
          key={loja.id}
          className="border p-4 rounded-lg shadow-sm hover:shadow-md transition"
        >
          <h2 className="text-lg font-bold">
            <Link href={`/loja/${loja.id}`} className="text-blue-700 hover:underline">
              {loja.nome}
            </Link>
          </h2>
          <p className="text-sm text-gray-600">Produtos encontrados:</p>
          <ul className="list-disc list-inside ml-4 mt-2">
            {loja.produtos.map((produto, index) => (
              <li key={index}>{produto}</li>
            ))}
          </ul>
          <Link
            href={`/loja/${loja.id}`}
            className="inline-block mt-3 text-blue-600 hover:underline"
          >
            Ver catálogo da loja
          </Link>
        </div>
      ))}
    </div>
  );
}
