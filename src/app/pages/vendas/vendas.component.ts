import { Component, OnInit } from '@angular/core';
import { NavbarvendasComponent } from '../../layout/navbars/navbarvendas/navbarvendas.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor } from '@angular/common';
import { MesaService } from '../../services/mesa.service';
import { FormsModule } from '@angular/forms';
import { Mesa } from '../../models/mesa';

@Component({
  selector: 'app-vendas',
  standalone: true,
  imports: [
    NavbarvendasComponent,
    RouterLink,
    RouterLinkActive,
    NgFor,
    FormsModule,
  ],
  templateUrl: './vendas.component.html',
  styleUrl: './vendas.component.css',
})
export class VendasComponent implements OnInit {
  mesas: Mesa[] = [];

  constructor(private mesaService: MesaService) {}

  async ngOnInit() {
    this.mesas = await this.mesaService.getMesas();
  }

  fazerPedido(mesa: Mesa) {
    this.mesaService.alterarMesa(mesa);
    // Navegue para o componente de pedido
  }
}
