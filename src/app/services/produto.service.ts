import { Injectable } from '@angular/core';
import { Produto } from '../models/produto';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private lista: Produto[] = [];
  private listaAtualizada = new BehaviorSubject<Produto[]>([]);

  constructor() {}

  private http = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
  });

  async getLista(): Promise<Produto[]> {
    try {
      const response = (await this.http.get('/produtos')).data.data; // Response é do tipo any[]

      const produtos: Produto[] = response.map((item: any) => {
        // Mapeie cada item da resposta para o tipo Produto
        const produto: Produto = {
          // Preencha os campos do produto com os dados recebidos
          idProduto: item.idProduto,
          Nome_produto: item.Nome_produto,
          Descricao: item.Descricao,
          Preco_venda: item.Preco_venda,
          Preco_compra: item.Preco_compra,
          // Continue preenchendo os outros campos conforme necessário
        };
        return produto;
      });

      return response; // Retorna os produtos obtidos do back-end
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
      // Atualize a lista de produtos após a edição
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
      // Atualize a lista de produtos após a exclusão
      this.lista = await this.getLista();
      this.listaAtualizada.next([...this.lista]);
    } catch (error) {
      console.error('Erro ao excluir o produto', error);
      throw error;
    }
  }
}
