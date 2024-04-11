import { Injectable } from '@angular/core';
import { Pedido } from '../models/pedido';
import { BehaviorSubject } from 'rxjs';
import { ItemPedido } from '../models/itempedido';
import { Produto } from '../models/produto';
import axios from 'axios';

interface Item {
  Quantidade: number;
  Total_soma: number;
  idProduto: number;
}

interface PedidoPost {
  pedido: Pedido;
  itens: Item[];
}
@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private lista: Pedido[] = [];
  private listaAtualizada = new BehaviorSubject<Pedido[]>([]);

  private http = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
  });

  formasDePagamento = [
    'Dinheiro',
    'Cartão de Crédito',
    'Cartão de Débito',
    'Pix',
  ];
  get listaAtualizadaObservable() {
    return this.listaAtualizada.asObservable();
  }

  async adicionarPedidoPost(pedidoPost: PedidoPost): Promise<void> {
    try {
      const response = await this.http.post('/pedidos', pedidoPost);
      console.log('Pedido adicionado', response);
      this.lista.push(pedidoPost.pedido);
      this.listaAtualizada.next([...this.lista]);
    } catch (error) {
      console.error('Erro ao adicionar o pedido', error);
      throw error;
    }
  }

  async getLista(): Promise<Pedido[]> {
    try {
      const response = (await this.http.get('/pedidos')).data.data;

      const pedidos: Pedido[] = response.map((item: any) => {
        const pedido: Pedido = new Pedido(
          item.idPedido,
          item.Data,
          item.Forma_pagamento,
          item.Obs
        );
        pedido.Valor_total = item.Valor_total;
        return pedido;
      });

      return pedidos; // Retorne 'pedidos' em vez de 'response'
    } catch (error) {
      console.error('Erro ao obter a lista de pedidos:', error);
      throw error;
    }
  }

  async adicionarPedido(pedidoPost: PedidoPost): Promise<void> {
    try {
      const response = await this.http.post('/pedidos', pedidoPost);
      console.log('Pedido adicionado', response);
      this.lista.push(pedidoPost.pedido);
      this.listaAtualizada.next([...this.lista]);
    } catch (error) {
      console.error('Erro ao adicionar o pedido', error);
      throw error;
    }
  }

  async editarPedido(pedido: Pedido): Promise<void> {
    try {
      const response = await this.http.put(
        `/pedidos/${pedido.idPedido}`,
        pedido
      );
      console.log('Pedido editado', response);
      this.lista = await this.getLista();
      this.listaAtualizada.next([...this.lista]);
    } catch (error) {
      console.error('Erro ao editar o pedido', error);
      throw error;
    }
  }

  async excluirPedido(id: number): Promise<void> {
    try {
      const response = await this.http.delete(`/pedidos/${id}`);
      console.log('Pedido excluído', response);
      this.lista = await this.getLista();
      this.listaAtualizada.next([...this.lista]);
    } catch (error) {
      console.error('Erro ao excluir o pedido', error);
      throw error;
    }
  }
  async finalizarPedido(pedido: Pedido): Promise<void> {
    if (!pedido || pedido.idPedido === 0) {
      throw new Error('Pedido inválido');
    }
    try {
      const response = await this.http.put(
        `/pedidos/${pedido.idPedido}`,
        pedido
      );
      console.log('Pedido finalizado', response);
      this.lista = await this.getLista();
      this.listaAtualizada.next([...this.lista]);
    } catch (error) {
      console.error('Erro ao finalizar o pedido', error);
      throw error;
    }
  }

  async getPedidosFinalizados(): Promise<Pedido[]> {
    try {
      const response = (await this.http.get('/pedidos')).data.data;

      const pedidos: Pedido[] = await Promise.all(
        response.map(async (item: any) => {
          const pedido: Pedido = new Pedido(
            item.idPedido,
            item.Data,
            item.Forma_pagamento,
            item.Obs
          );
          pedido.Valor_total = item.Valor_total;

          // Buscar os itens do pedido
          pedido.itens = await this.getItensPedido(pedido.idPedido);

          return pedido;
        })
      );

      return pedidos;
    } catch (error) {
      console.error('Erro ao obter a lista de pedidos finalizados:', error);
      throw error;
    }
  }

  async getNextId(): Promise<number> {
    const pedidos = await this.getLista();
    const maxId = Math.max(...pedidos.map((p) => p.idPedido), 0);
    return maxId + 1;
  }

  adicionarPedidoLista(pedido: Pedido) {
    this.lista.push(pedido);
    this.listaAtualizada.next([...this.lista]);
  }

  getListaPedidos(): Pedido[] {
    return [...this.lista];
  }

  async getItensPedido(idPedido: number): Promise<ItemPedido[]> {
    try {
      const response = await this.http.get(`/pedidos/${idPedido}/itens`);

      // Mapeie a resposta da API para o seu modelo ItemPedido
      const itens: ItemPedido[] = response.data.map((item: any) => {
        return {
          idPedido: item.idPedido,
          quantidade: item.Quantidade,
          produto: { idProduto: item.idProduto }, // Inicialmente, apenas o idProduto é conhecido
        };
      });

      // Buscar os detalhes do produto para cada item
      for (let item of itens) {
        const produto = await this.getProduto(item.produto.idProduto);
        item.produto = produto; // Atribuir os detalhes do produto ao item
      }

      return itens;
    } catch (error) {
      console.error('Erro ao obter os itens do pedido:', error);
      throw error;
    }
  }

  async getProduto(idProduto: number): Promise<Produto> {
    try {
      const response = await this.http.get(`/produtos/${idProduto}`);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao obter o produto:', error);
      throw error;
    }
  }
}
