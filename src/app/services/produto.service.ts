import { Injectable } from '@angular/core';
import { Produto } from '../models/produto';
import { BehaviorSubject, Observable } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private lista: Produto[] = [];
  private listaAtualizada = new BehaviorSubject<Produto[]>([]);
  private http = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
  });

  getListaAtualizada(): Observable<Produto[]> {
    return this.listaAtualizada.asObservable();
  }

  async getLista(): Promise<Produto[]> {
    try {
      const response = (await this.http.get('/produtos')).data.data;
      this.lista = response.map((item: any) => {
        const produto: Produto = {
          idProduto: item.idProduto,
          Nome_produto: item.Nome_produto,
          Descricao: item.Descricao,
          Preco_venda: item.Preco_venda,
          Preco_compra: item.Preco_compra,
          Preco_lojista: item.Preco_lojista,
          Imagem: item.Imagem,
          idCategoria: item.idCategoria,
        };
        return produto;
      });
      this.listaAtualizada.next([...this.lista]);
      return this.lista;
    } catch (error) {
      console.error('Erro ao obter a lista de produtos:', error);
      throw error;
    }
  }

  async adicionarProduto(novoProduto: Produto): Promise<void> {
    try {
      const response = await this.http.post('/produtos', novoProduto);
      console.log('Produto adicionado', response);
      this.lista.push(novoProduto);
      this.listaAtualizada.next([...this.lista]);
    } catch (error) {
      console.error('Erro ao adicionar o produto', error);
      throw error;
    }
  }

  async editarProduto(produto: Produto): Promise<void> {
    try {
      const response = await this.http.put(
        `/produtos/${produto.idProduto}`,
        produto
      );
      console.log('Produto editado', response);
      this.lista = await this.getLista();
      this.listaAtualizada.next([...this.lista]);
    } catch (error) {
      console.error('Erro ao editar o produto', error);
      throw error;
    }
  }

  async excluirProduto(id: number): Promise<void> {
    try {
      const response = await this.http.delete(`/produtos/${id}`);
      console.log('Produto excluído', response);
      if (response.status === 200) {
        this.lista = await this.getLista();
        this.listaAtualizada.next([...this.lista]);
      } else {
        console.error('Erro ao excluir o produto:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao excluir o produto', error);
      throw error;
    }
  }

  async finalizarPedido(id: number): Promise<void> {
    try {
      const response = await this.http.put(`/pedidos/finalizar/${id}`);
      console.log('Pedido finalizado', response);
      this.lista = await this.getLista();
      this.listaAtualizada.next([...this.lista]);
    } catch (error) {
      console.error('Erro ao finalizar o pedido', error);
      throw error;
    }
  }
}
