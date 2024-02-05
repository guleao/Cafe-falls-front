import { Injectable } from '@angular/core';
import { Produto } from '../models/produto';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private lista: Produto[] = [];
  private listaAtualizada = new BehaviorSubject<Produto[]>([]);
  private codigoMaximo = 999;

  constructor() {}

  /* ADICIONAR O PRODUTO NA LISTA COM CÓDIGO ALEATÓRIO */
  adicionarProduto(produto: Produto) {
    produto.codigo = this.gerarCodigoUnico();
    this.lista.push(produto);
    this.listaAtualizada.next([...this.lista]);
  }

  getLista() {
    console.log(this.lista);
    return this.listaAtualizada.asObservable();
  }

  getProximoId() {
    return this.lista.length + 1;
  }

  private gerarCodigoUnico(): string {
    let codigo: string;
    do {
      codigo = Math.floor(Math.random() * this.codigoMaximo)
        .toString()
        .padStart(3, '0');
    } while (this.lista.find((produto) => produto.codigo === codigo));
    return codigo;
  }

  /* ATUALIZAR PRODUTO DENTRO DA LISTA */

  getProdutoId(id: number): Produto | null {
    let produto = this.lista.find((produto) => produto.id === id);
    return produto ? produto : null;
  }
}
