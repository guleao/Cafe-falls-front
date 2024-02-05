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
export class VendasComponent {
  mesas: { id: number; nome: string }[] = [];

  constructor(private mesaService: MesaService) {}

  ngOnInit() {
    this.mesas = this.mesaService.getMesas();
  }
}
