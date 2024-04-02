import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor } from '@angular/common';
import { PedidoService } from '../../services/pedido.service';
import { FormsModule } from '@angular/forms';
import { Pedido } from '../../models/pedido';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ItemPedido } from '../../models/itempedido';

import { NavbarvendasdoisComponent } from '../../layout/navbars/navbarvendasdois/navbarvendasdois.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-vendas',
  standalone: true,
  imports: [
    NavbarvendasdoisComponent,
    RouterLink,
    RouterLinkActive,
    NgFor,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    AgGridModule,
  ],
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css'],
})
export class VendasComponent implements OnInit {
  pedidosFinalizados: Pedido[] = [];
  pedidoAtual: Pedido | null = null;
  itensPedidoAtual: ItemPedido[] = [];
  p: number = 1;

  constructor(private pedidoService: PedidoService, private router: Router) {}

  ngOnInit(): void {
    this.pedidoService
      .getLista()
      .then((pedidos) => {
        this.pedidosFinalizados = pedidos;
      })
      .catch((error) => {
        // Trate o erro aqui, se necessário
        console.error('Erro ao obter lista de pedidos:', error);
      });

    this.pedidoService.listaAtualizadaObservable.subscribe(
      (pedidos: Pedido[]) => {
        this.pedidosFinalizados = pedidos;
      }
    );
  }

  fazerPedidoNoBalcao(): void {
    this.router.navigate(['/pedido']);
  }

  async abrirModalVerMais(pedido: Pedido) {
    this.pedidoAtual = pedido;
    this.itensPedidoAtual = await this.pedidoService.getItensPedido(
      pedido.idPedido
    );

    // Buscar os detalhes do produto para cada item
    for (let item of this.itensPedidoAtual) {
      item.produto = await this.pedidoService.getProduto(
        item.produto.idProduto
      );
    }

    const modalDiv = document.getElementById('modalMais');
    if (modalDiv != null) {
      modalDiv.style.display = 'block';
    }
  }
}
