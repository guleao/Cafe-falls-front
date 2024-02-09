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
      const response = (await this.http.get('/produto')).data.data; // Response é do tipo any[]

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
      const response = await this.http.post('/produto', novoProduto);
      console.log('Produto adicionado', response);
      this.lista.push(novoProduto);
      this.listaAtualizada.next([...this.lista]);
    } catch (error) {
      console.error('Erro ao adicionar o produto', error);
      throw error;
    }
  }
}
