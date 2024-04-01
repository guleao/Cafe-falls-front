import { Component, OnInit } from '@angular/core';
import { NavbarvendasComponent } from '../../layout/navbars/navbarvendas/navbarvendas.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor } from '@angular/common';
import { PedidoService } from '../../services/pedido.service';
import { FormsModule } from '@angular/forms';
import { Pedido } from '../../models/pedido';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Produto } from '../../models/produto';

@Component({
  selector: 'app-vendas',
  standalone: true,
  imports: [
    NavbarvendasComponent,
    RouterLink,
    RouterLinkActive,
    NgFor,
    FormsModule,
    HttpClientModule,
  ],
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css'],
})
export class VendasComponent implements OnInit {
  pedidosFinalizados: Pedido[] = [];

  constructor(private pedidoService: PedidoService, private router: Router) {}

  ngOnInit(): void {
    this.pedidoService
      .getLista()
      .then((pedidos: Pedido[]) => {
        this.pedidosFinalizados = pedidos;
      })
      .catch((error) => {
        // Trate o erro aqui, se necessário
        console.error('Erro ao obter lista de pedidos:', error);
      });
    this.pedidoService.getPedidosFinalizados().then((pedidos) => {
      this.pedidosFinalizados = pedidos;
    });
  }

  fazerPedidoNoBalcao(): void {
    this.router.navigate(['/pedido']);
  }
}
