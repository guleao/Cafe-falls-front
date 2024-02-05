export class Produto {
  constructor(
    public id: number,
    public nomeProduto: string,
    public descricaoItem: string,
    public precoCompra: number,
    public precoVenda: number,
    public codigo: string
  ) {}
}
