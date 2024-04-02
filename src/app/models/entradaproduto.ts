export class EntradaProduto {
  idEntrada_Produto: number;
  idProduto: number;
  Quantidade: number;
  Preco: number;
  Data: Date;
  Validade: Date;
  Informacoes_adicionais: string;

  constructor(
    idEntrada_Produto: number,
    idProduto: number,
    Quantidade: number,
    Preco: number,
    Data: Date,
    Validade: Date,
    Informacoes_adicionais: string
  ) {
    this.idEntrada_Produto = idEntrada_Produto;
    this.idProduto = idProduto;
    this.Quantidade = Quantidade;
    this.Preco = Preco;
    this.Data = Data;
    this.Validade = Validade;
    this.Informacoes_adicionais = Informacoes_adicionais;
  }
}
