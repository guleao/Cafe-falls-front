import { Injectable } from '@angular/core';
import { EntradaProduto } from '../models/entradaitem';
import { BehaviorSubject } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class EntradaProdutoService {
  private lista: EntradaProduto[] = [];
  private listaAtualizada = new BehaviorSubject<EntradaProduto[]>([]);
  private http = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
  });

  async getLista(): Promise<EntradaProduto[]> {
    try {
      const response = (await this.http.get('/entrada_produto')).data.data;
      this.lista = response;
      this.listaAtualizada.next([...this.lista]);
      return response;
    } catch (error) {
      console.error('Erro ao obter a lista de produtos:', error);
      throw error;
    }
  }

  async adicionarProduto(novoProduto: EntradaProduto): Promise<void> {
    try {
      const response = await this.http.post('/entrada_produto', novoProduto);
      console.log('Produto adicionado', response);
      this.lista.push(novoProduto);
      this.listaAtualizada.next([...this.lista]);
    } catch (error) {
      console.error('Erro ao adicionar o produto', error);
      throw error;
    }
  }

  async editarProduto(produto: EntradaProduto): Promise<void> {
    try {
      const response = await this.http.put(
        `/entrada_produto/${produto.idEntrada_Produto}`,
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
      const response = await this.http.delete(`/entrada_produto/${id}`);
      console.log('Produto excluído', response);
      this.lista = await this.getLista();
      this.listaAtualizada.next([...this.lista]);
    } catch (error) {
      console.error('Erro ao excluir o produto', error);
      throw error;
    }
  }
}
