import { Injectable } from '@angular/core';
import { Pedido } from '../models/pedido';
import { BehaviorSubject } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private lista: Pedido[] = [];
  private listaAtualizada = new BehaviorSubject<Pedido[]>([]);
  private http = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
  });

  async getLista(): Promise<Pedido[]> {
    try {
      const response = (await this.http.get('/pedidos')).data.data;

      const pedidos: Pedido[] = response.map((item: any) => {
        const pedido: Pedido = {
          idPedido: item.idPedido,
          idMesa: item.idMesa,
          Data: item.Data,
          Valor_total: item.Valor_total,
          Forma_pagamento: item.Forma_pagamento,
          Obs: item.Obs,
          formasdePagamento: [],
        };
        return pedido;
      });

      return response;
    } catch (error) {
      console.error('Erro ao obter a lista de pedidos:', error);
      throw error;
    }
  }

  async adicionarPedido(novoPedido: Pedido): Promise<void> {
    try {
      const response = await this.http.post('/pedidos', novoPedido);
      console.log('Pedido adicionado', response);
      this.lista.push(novoPedido);
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
  async finalizarPedido(idPedido: number): Promise<void> {
    if (idPedido === 0) {
      throw new Error('ID do pedido inválido');
    }
    try {
      const response = await this.http.put(`/pedidos/${idPedido}`);
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

      const pedidos: Pedido[] = response.map((item: any) => {
        const pedido: Pedido = {
          idPedido: item.idPedido,
          idMesa: item.idMesa,
          Data: item.Data,
          Valor_total: item.Valor_total,
          Forma_pagamento: item.Forma_pagamento,
          Obs: item.Obs,
          formasdePagamento: [],
        };
        return pedido;
      });

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
}
