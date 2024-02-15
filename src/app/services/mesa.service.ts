import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MesaService {
  private mesas: { id: number; nome: string; isChecked: boolean }[] = [
    { id: 1, nome: 'Mesa 1', isChecked: false },
    { id: 2, nome: 'Mesa 2', isChecked: false },
    { id: 3, nome: 'Mesa 3', isChecked: false },
    { id: 4, nome: 'Mesa 4', isChecked: false },
    { id: 5, nome: 'Mesa 5', isChecked: false },
    { id: 6, nome: 'Mesa 6', isChecked: false },
    { id: 7, nome: 'Mesa 7', isChecked: false },
    { id: 8, nome: 'Mesa 8', isChecked: false },
    { id: 9, nome: 'Mesa 9', isChecked: false },
    { id: 10, nome: 'Mesa 10', isChecked: false },
    { id: 11, nome: 'Mesa 11', isChecked: false },
    { id: 12, nome: 'Mesa 12', isChecked: false },
  ];

  constructor() {}

  // Método para obter todas as mesas
  getMesas() {
    return this.mesas;
  }
}
