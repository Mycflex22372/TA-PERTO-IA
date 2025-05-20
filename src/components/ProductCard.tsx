type Produto = {
    id: number;
    nome: string;
    preco: number;
    loja: string;
    cidade: string;
    imagem: string;
  };
  
  export default function ProductCard({ produto }: { produto: Produto }) {
    return (
      <div className="bg-white text-black rounded-lg shadow p-4 w-64">
        <img src={produto.imagem} alt={produto.nome} className="w-full h-40 object-cover rounded mb-2" />
        <h2 className="text-lg font-semibold">{produto.nome}</h2>
        <p className="text-sm text-gray-600 mb-1">Loja: {produto.loja}</p>
        <p className="text-blue-600 font-bold text-lg">R$ {produto.preco.toFixed(2)}</p>
      </div>
    );
  }
  