import { Injectable } from '@angular/core';
import { Categorias } from '../models/categorias';
import { BehaviorSubject } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private lista: Categorias[] = [];
  private listaAtualizada = new BehaviorSubject<Categorias[]>([]);
  private http = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
  });

  async getLista(): Promise<Categorias[]> {
    try {
      const response = (await this.http.get('/categorias')).data;

      const categorias: Categorias[] = response.map((item: any) => {
        const categoria: Categorias = {
          idCategoria: item.idCategoria,
          Nome_categoria: item.Nome_categoria,
          Descricao: item.Descricao,
          produtos: item.produtos,
        };
        return categoria;
      });

      return categorias;
    } catch (error) {
      console.error('Erro ao obter a lista de categorias:', error);
      throw error;
    }
  }
}
