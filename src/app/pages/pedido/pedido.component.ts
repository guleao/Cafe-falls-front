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
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [NavbarmesasComponent, CommonModule, FormsModule],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css',
})
export class PedidoComponent implements OnInit {
  lista: Produto[] = [];
  listaProdutos: Produto[] = [];
  categorias: Categorias[] = [];
  mesaAtual: Mesa | null = null;
  visualizandoProdutos = false;
  pesquisa: string = '';
  listaProdutosFiltrados: Produto[] = [];

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
    this.listaProdutosFiltrados = this.lista.filter(
      (produto) => produto.idCategoria === categoria.idCategoria
    );
    this.visualizandoProdutos = true;
  }

  voltarParaCategorias() {
    this.visualizandoProdutos = false;
  }

  filtrarProdutos() {
    if (this.pesquisa === '') {
      this.visualizandoProdutos = false;
      return;
    }

    this.visualizandoProdutos = true;
    this.listaProdutosFiltrados = this.lista.filter((produto) =>
      produto.Nome_produto.toLowerCase().includes(this.pesquisa.toLowerCase())
    );
  }

  adicionaroAoPedido(produto: Produto) {
    // Implemente a lógica para adicionar o produto ao pedido
  }
}
