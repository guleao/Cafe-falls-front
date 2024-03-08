import { Injectable } from '@angular/core';
import axios from 'axios';
import { ItensMesa } from '../models/itensmesa';

@Injectable({
  providedIn: 'root',
})
export class ItensMesaService {
  constructor() {}

  private http = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
  });

  async getItensMesa(): Promise<ItensMesa[]> {
    try {
      const response = (await this.http.get('/Itens_mesa')).data.data;

      const itemMesas: ItensMesa[] = response.map((item: any) => {
        const itemMesa: ItensMesa = {
          idMesa: item.idMesa,
          Quantidade: item.Quantidade,
          Total_soma: item.Total_soma,
          idProduto: item.idProduto,
        };
        return itemMesa;
      });
      return response;
    } catch (error) {
      console.error('Erro ao obter lista de itens da mesa', error);
      throw error;
    }
  }
}
