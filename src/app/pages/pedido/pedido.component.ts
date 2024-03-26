import { Component, OnInit } from '@angular/core';
import { NavbarmesasComponent } from '../../layout/navbars/navbarmesas/navbarmesas.component';
import { CommonModule } from '@angular/common';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto.service';
import { Mesa } from '../../models/mesa';
import { MesaService } from '../../services/mesa.service';
import { ActivatedRoute } from '@angular/router';
import { Categorias } from '../../models/categorias';
import { CategoriaService } from '../../services/categorias.service';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [NavbarmesasComponent, CommonModule],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css',
})
export class PedidoComponent implements OnInit {
  lista: Produto[] = [];
  listaProdutos: Produto[] = [];
  categorias: Categorias[] = [];
  mesaAtual: Mesa | null = null;
  visualizandoProdutos = false;

  constructor(
    private produtoService: ProdutoService,
    private mesaService: MesaService,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute
  ) {
    this.mesaService.mesaAtual.subscribe((mesa) => {
      this.mesaAtual = mesa;
      console.log('Mesa atual:', this.mesaAtual);
    });
  }

  async ngOnInit() {
    this.lista = await this.produtoService.getLista();
    this.categorias = await this.categoriaService.getLista();
  }

  selecionarCategoria(categoria: Categorias) {
    this.listaProdutos = this.lista.filter(
      (produto) => produto.idCategoria === categoria.idCategoria
    );
    this.visualizandoProdutos = true;
  }

  voltarParaCategorias() {
    this.visualizandoProdutos = false;
  }

  adicionaroAoPedido(produto: Produto) {
    // Implemente a lógica para adicionar o produto ao pedido
  }
}
