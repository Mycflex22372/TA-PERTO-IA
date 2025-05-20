import { useRouter } from "next/router";
import { produtos } from "@/data/produtos";

export default function ProdutoNome() {
  const router = useRouter();
  const { nome } = router.query;

  const produto = produtos.find((p) => p.nome.toLowerCase() === nome?.toString().toLowerCase());

  if (!produto) return <p>Produto não encontrado.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{produto.nome}</h1>
      <p>{produto.descricao}</p>

      <h2>Lojas:</h2>
      <ul>
        {produto.lojas?.map((loja, index) => (
          <li key={index}>
            <strong>Loja:</strong> {loja.nome} <br />
            <strong>Cidade:</strong> {loja.cidade} <br />
            <strong>Preço:</strong> R$ {loja.preco}
          </li>
        ))}
      </ul>
    </div>
  );
}
