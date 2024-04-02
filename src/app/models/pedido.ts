import { ItemPedido } from './itempedido';

export class Pedido {
  idPedido: number;
  Data: string;
  Valor_total: number;
  Forma_pagamento: number;
  Obs: string;
  itens: ItemPedido[]; // Adicione esta linha

  constructor(
    idPedido: number,
    Data: string,
    Forma_pagamento: number,
    Obs: string,
    itens: ItemPedido[] = [] // Adicione isto ao construtor
  ) {
    this.idPedido = idPedido;
    this.Data = Data;
    this.Valor_total = 0;
    this.Forma_pagamento = Forma_pagamento;
    this.Obs = Obs;
    this.itens = itens; // E aqui
  }
}
