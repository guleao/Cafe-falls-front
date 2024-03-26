import { Produto } from './produto';

export class ItemPedido {
  produto: Produto;
  quantidade: number;

  constructor(produto: Produto, quantidade: number = 1) {
    this.produto = produto;
    this.quantidade = quantidade;
  }
}
