import { Component, OnInit } from '@angular/core';
import { NavbarvendasComponent } from '../../layout/navbars/navbarvendas/navbarvendas.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor } from '@angular/common';
import { MesaService } from '../../services/mesa.service';
import { FormsModule } from '@angular/forms';
import { Mesa } from '../../models/mesa';
import { Router } from '@angular/router';

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
  styleUrls: ['./vendas.component.css'],
})
export class VendasComponent implements OnInit {
  mesas: Mesa[] = [];

  constructor(private mesaService: MesaService, private router: Router) {}

  async ngOnInit() {
    this.mesas = await this.mesaService.getMesas();
  }

  fazerPedido(mesa: Mesa) {
    this.mesaService.alterarMesa(mesa);
    this.router.navigate(['/pedido']);
  }

  verificarPedido(mesa: Mesa) {
    this.mesaService.mesaAtual.subscribe((mesaAtual) => {
      if (mesaAtual === mesa) {
        console.log('Pedido sendo criado para a mesa selecionada');
      } else {
        console.log('Pedido não está sendo criado para a mesa selecionada');
      }
    });
  }
}
