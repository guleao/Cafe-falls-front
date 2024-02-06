export class Produto {
  constructor(
    public idProduto: number,
    public Nome_produto: string,
    public Descricao: string,
    public Preco_compra: number,
    public Preco_venda: number
  ) {}
}
