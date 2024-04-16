import { Component } from '@angular/core';
import { NavbarconsultarComponent } from '../../layout/navbars/navbarconsultar/navbarconsultar.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Pedido } from '../../models/pedido';
import { PedidoService } from '../../services/pedido.service';
import { FormControl, FormGroup } from '@angular/forms';

import { NavbarlistaComponent } from '../../layout/navbars/navbarlista/navbarlista.component';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { AgGridModule } from 'ag-grid-angular';

@Component({
  selector: 'app-consultar',
  standalone: true,
  templateUrl: './consultar.component.html',
  styleUrl: './consultar.component.css',
  imports: [
    NavbarconsultarComponent,
    RouterLink,
    RouterLinkActive,
    NavbarlistaComponent,
    CommonModule,
    NgxPaginationModule,
    AgGridModule,
  ],
})
export class ConsultarComponent {
  pedidosFinalizados: Pedido[] = [];
  formulario = new FormGroup({
    campo1: new FormControl(''),
  });
  p: number = 1;

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.pedidoService
      .getLista()
      .then((pedidos) => {
        this.pedidosFinalizados = pedidos;
      })
      .catch((error) => {
        console.error('Erro ao obter lista de pedidos:', error);
      });
  }
}
