import { Component, NgModule } from '@angular/core';
import { NavbarconsultarComponent } from '../../layout/navbars/navbarconsultar/navbarconsultar.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Pedido } from '../../models/pedido';
import { PedidoService } from '../../services/pedido.service';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';

import { NavbarlistaComponent } from '../../layout/navbars/navbarlista/navbarlista.component';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';

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
    FormsModule,
  ],
})
export class ConsultarComponent {
  initDate: string = '';
  endDate: string = '';
  pedidos: any[] = [];
  showModal: boolean = false;
  pedidosFinalizados: Pedido[] = [];
  formulario = new FormGroup({
    campo1: new FormControl(''),
  });
  p: number = 1;

  constructor(private pedidoService: PedidoService, private http: HttpClient) {
    this.initDate = '';
    this.endDate = '';
  }

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

  openModalComparacao() {
    const modalDiv = document.getElementById('modalComparacao');
    if (modalDiv != null) {
      modalDiv.style.display = 'block';
    }
  }

  // Função para fechar a modal de comparação
  closeModalComparacao() {
    const modalDiv = document.getElementById('modalComparacao');
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
    }
  }

  getPedidos() {
    this.http
      .get<any[]>(
        `http://localhost:8000/api/pedidos/relatorio/get?initDate=${this.initDate}&endDate=${this.endDate}`
      )
      .subscribe((pedidos: any[]) => {
        this.pedidos = pedidos;
      });
  }

  formatarData(data: string): string {
    const dataFormatada = new Date(data);
    const dia = dataFormatada.getDate().toString().padStart(2, '0');
    const mes = (dataFormatada.getMonth() + 1).toString().padStart(2, '0'); // Os meses começam do 0 em JavaScript, então adicionamos 1
    const ano = dataFormatada.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }
}
