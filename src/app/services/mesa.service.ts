import { Injectable } from '@angular/core';
import axios from 'axios';
import { Mesa } from '../models/mesa';
import { BehaviorSubject } from 'rxjs';

// Injectable marca a classe como um serviço que pode ser injetado em outras partes da aplicação.
@Injectable({
  providedIn: 'root',
})
export class MesaService {

  private mesaSource = new BehaviorSubject<Mesa | null>(null);
  // Estamos criando uma nova instância de BehaviorSubject para armazenar e emitir os valores da mesa atual.
  
  mesaAtual = this.mesaSource.asObservable();


  // CONFIGURAÇÃO DO AXIOS:
  private http = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
  });

  // Método getMesas que vai ser utilizado para pegar os dados das mesas.
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
