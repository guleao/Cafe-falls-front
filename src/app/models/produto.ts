export class Produto {
  constructor(
    public idProduto: number,
    public Nome_produto: string,
    public Preco_lojista: number,
    public Preco_compra: number,
    public Preco_venda: number,
    public Descricao: string,
    public Imagem: string | null, // Alterado para string | null para corresponder à model do back-end
    public idCategoria: number
  ) {}
}
