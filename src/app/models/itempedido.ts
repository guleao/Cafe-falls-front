import { Produto } from './produto';
import { Pedido } from './pedido';
export class ItemPedido {
  produto: Produto;
  idProduto: number;
  quantidade: number;

  constructor(produto: Produto, idProduto: number, quantidade: number = 1) {
    this.produto = produto;
    this.quantidade = quantidade;
    this.idProduto = idProduto;
  }
}
export interface Item {
  Quantidade: number;
  Total_soma: number;
  idProduto: number;
}

export interface PedidoPost {
  pedido: Pedido;
  itens: Item[];
}
