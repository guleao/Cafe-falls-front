export class NovoProduto {
  constructor(
    public Nome_produto: string,
    public Preco_lojista: number,
    public Preco_compra: number,
    public Preco_venda: number,
    public Descricao: string,
    public Imagem: string | null,
    public idCategoria: number
  ) {}
}
