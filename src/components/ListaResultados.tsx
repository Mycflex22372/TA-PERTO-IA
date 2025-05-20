import Link from "next/link";

interface Loja {
  nome: string;
  cidade: string;
  preco: number;
  imagem?: string;
}

interface Produto {
  nome: string;
  slug: string;
  descricao?: string;
  lojas: Loja[];
}

interface ListaResultadosProps {
  produtos: Produto[];
}

export default function ListaResultados({ produtos }: ListaResultadosProps) {
  if (!produtos || produtos.length === 0) {
    return <p style={{ marginTop: "20px" }}>Nenhum produto encontrado.</p>;
  }

  return (
    <div style={{ marginTop: "20px" }}>
      {produtos.map((produto, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "15px",
            marginBottom: "20px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Link href={`/produtos/${produto.slug}`}>
            <h2 style={{ color: "#0D47A1", cursor: "pointer" }}>{produto.nome}</h2>
          </Link>
          <p>{produto.descricao}</p>
          <ul>
            {produto.lojas.map((loja, i) => (
              <li key={i}>
                <strong>Loja:</strong> {loja.nome} – <strong>Cidade:</strong> {loja.cidade} –{" "}
                <strong>Preço:</strong> R$ {loja.preco.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
