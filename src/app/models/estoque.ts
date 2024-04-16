export class Estoque {
  idEstoque: number;
  idProduto: number;
  quantidade: number;
  data: string;

  constructor(
    idEstoque: number,
    idProduto: number,
    quantidade: number,
    data: string
  ) {
    this.idEstoque = idEstoque;
    this.idProduto = idProduto;
    this.quantidade = quantidade;
    this.data = data;
  }
}
