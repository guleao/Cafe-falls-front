import { Component } from '@angular/core';
import { NavbarvendasComponent } from '../../layout/navbars/navbarvendas/navbarvendas.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor } from '@angular/common';
import { MesaService } from '../../services/mesa.service';

@Component({
  selector: 'app-vendas',
  standalone: true,
  imports: [NavbarvendasComponent, RouterLink, RouterLinkActive, NgFor],
  templateUrl: './vendas.component.html',
  styleUrl: './vendas.component.css',
})
export class MesaService {
  private mesas: { id: number; nome: string }[] = [
    { id: 1, nome: 'Mesa 1' },
    { id: 2, nome: 'Mesa 2' },
    { id: 3, nome: 'Mesa 3' },
    { id: 4, nome: 'Mesa 4' },
    { id: 5, nome: 'Mesa 5' },
    { id: 6, nome: 'Mesa 6' },
    { id: 7, nome: 'Mesa 7' },
    { id: 8, nome: 'Mesa 8' },
    { id: 9, nome: 'Mesa 9' },
    { id: 10, nome: 'Mesa 10' },
    { id: 11, nome: 'Mesa 11' },
    { id: 12, nome: 'Mesa 12' },
  ];

  constructor() {}

  // Método para obter todas as mesas
  getMesas() {
    return this.mesas;
  }
}
