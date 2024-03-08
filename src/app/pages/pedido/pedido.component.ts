import { Component } from '@angular/core';
import { NavbarmesasComponent } from '../../layout/navbars/navbarmesas/navbarmesas.component';
import { CommonModule } from '@angular/common';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto.service';
import { Mesa } from '../../models/mesa';
import { MesaService } from '../../services/mesa.service';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [NavbarmesasComponent, CommonModule],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css',
})
export class PedidoComponent {
  lista: Produto[] = [];
  listaPedidos: Produto[] = [];

  mesaAtual: Mesa | null = null;

  constructor(
    private produtoService: ProdutoService,
    private mesaService: MesaService
  ) {
    this.mesaService.mesaAtual.subscribe((mesa) => (this.mesaAtual = mesa));
  }

  async ngOnInit() {
    this.lista = await this.produtoService.getLista();
  }

  adicionaroAoPedido(produto: Produto) {
    this.listaPedidos.push(produto);
  }
}
