import { Injectable } from '@angular/core';
import axios from 'axios';
import { Mesa } from '../models/mesa';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MesaService {
  private mesaSource = new BehaviorSubject<Mesa | null>(null);
  mesaAtual = this.mesaSource.asObservable();

  private http = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
  });

  // Método para obter todas as mesas
  async getMesas(): Promise<Mesa[]> {
    try {
      const response = (await this.http.get('/mesas')).data.data;

      const mesas: Mesa[] = response.map((amesa: any) => {
        const mesa: Mesa = {
          idMesa: amesa.idMesa,
          Status_mesa: amesa.statusMesa,
          Preco_total: amesa.precoTotal,
          Numero_mesa: amesa.numeroMesa,
          Tipo_pagamento: amesa.tipoPagamento,
        };
        return mesa;
      });

      return mesas;
    } catch (error) {
      console.error('Erro ao obter as mesas', error);
      throw error;
    }
  }

  alterarMesa(mesa: Mesa) {
    this.mesaSource.next(mesa);
  }
}
