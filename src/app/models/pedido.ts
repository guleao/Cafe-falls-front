export class Pedido {
  idPedido: number;
  idMesa: number;
  Data: string;
  Valor_total: number;
  Forma_pagamento: number;
  Obs: string;

  formasdePagamento = [
    'Dinheiro',
    'Cartão de Crédito',
    'Cartão de Débito',
    'Pix',
  ];

  constructor(
    idPedido: number,
    idMesa: number,
    Data: string,
    Valor_total: number,
    Forma_pagamento: number,
    Obs: string
  ) {
    this.idPedido = idPedido;
    this.idMesa = idMesa;
    this.Data = Data;
    this.Valor_total = Valor_total;
    this.Forma_pagamento = Forma_pagamento;
    this.Obs = Obs;
  }
}
