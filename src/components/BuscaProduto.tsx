import { useState } from "react";
import { produtos } from "@/data/produtos";
import { cidades } from "@/data/cidades";
import ListaResultados from "./ListaResultados";

export default function BuscaProduto() {
  const [termoBusca, setTermoBusca] = useState("");
  const [cidadeSelecionada, setCidadeSelecionada] = useState("");
  const [resultados, setResultados] = useState<any[]>([]);

  const buscar = () => {
    const termo = termoBusca.toLowerCase();

    const resultadosFiltrados = produtos
      .map((produto) => {
        const lojasFiltradas = produto.lojas.filter((loja) => {
          const correspondeProduto =
            produto.nome.toLowerCase().includes(termo) ||
            (produto.descricao && produto.descricao.toLowerCase().includes(termo));

          const correspondeCidade = cidadeSelecionada
            ? loja.cidade === cidadeSelecionada
            : true;

          return correspondeProduto && correspondeCidade;
        });

        if (lojasFiltradas.length > 0) {
          return {
            nome: produto.nome,
            slug: produto.slug,
            descricao: produto.descricao,
            lojas: lojasFiltradas,
          };
        } else {
          return null;
        }
      })
      .filter((produto) => produto !== null);

    setResultados(resultadosFiltrados as any[]);
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Buscar produto..."
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          style={{ padding: "10px", width: "250px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        <select
          value={cidadeSelecionada}
          onChange={(e) => setCidadeSelecionada(e.target.value)}
          style={{ marginLeft: "10px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        >
          <option value="">Todas as cidades</option>
          {cidades.map((cidade, index) => (
            <option key={index} value={cidade.nome}>
              {cidade.nome}
            </option>
          ))}
        </select>

        <button
          onClick={buscar}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            backgroundColor: "#0D47A1",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Buscar
        </button>
      </div>

      <ListaResultados produtos={resultados} />
    </div>
  );
}
