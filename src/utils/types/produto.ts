// src/types/produto.ts
export type Produto = {
  id: number;
  nome: string;
  preco: number;
  loja_id: number;
};
export type Pedido = {
  id: number;
  cliente: string;
  produto: string;
  preco: number;
  status: string;
  loja_id: number;
};
