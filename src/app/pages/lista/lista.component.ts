import { Component, OnInit } from '@angular/core';
import { NavbarlistaComponent } from '../../layout/navbars/navbarlista/navbarlista.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Produto } from '../../models/produto';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../services/produto.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [
    NavbarlistaComponent,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css',
})
export class ListaComponent implements OnInit {
  lista: Produto[] = [];
  novoProduto: Produto = new Produto(0, '', '', 0, 0);
  produtoParaEditar: Produto;

  produtosPorPagina = 30;
  paginaAtual = 1;

  get produtosPaginados() {
    const inicio = (this.paginaAtual - 1) * this.produtosPorPagina;
    const fim = inicio + this.produtosPorPagina;
    return this.lista.slice(inicio, fim);
  }

  proximaPagina() {
    if (this.paginaAtual * this.produtosPorPagina < this.lista.length) {
      this.paginaAtual++;
    }
  }

  paginaAnterior() {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
    }
  }

  adicionarProduto(produto: Produto) {
    this.lista.push(produto);
    this.atualizarLista();
  }

  atualizarLista() {
    this.lista = [...this.lista];
  }

  constructor(private produtoService: ProdutoService) {
    this.produtoParaEditar = new Produto(0, '', '', 0, 0);
  }

  async addProdutoList() {
    try {
      const response = await this.produtoService.adicionarProduto(
        this.novoProduto
      );
      this.lista = await this.produtoService.getLista();
    } catch (error) {
      console.log('Erro ao adicionar o produto', error);
    }
  }

  async editarProduto() {
    if (!this.produtoParaEditar) {
      console.log('Nenhum produto selecionado para edição');
      return;
    }

    try {
      await this.produtoService.editarProduto(this.produtoParaEditar);
      this.lista = await this.produtoService.getLista();
    } catch (error) {
      console.log('Erro ao editar o produto', error);
    }
  }

  async excluirProduto(id: number) {
    try {
      await this.produtoService.excluirProduto(id);
      this.lista = await this.produtoService.getLista();
    } catch (error) {
      console.log('Erro ao excluir o produto', error);
    }
  }

  async ngOnInit() {
    this.lista = await this.produtoService.getLista();
  }

  OpenModalEditar(produto: Produto) {
    if (!produto) {
      console.log('Nenhum produto fornecido');
      return;
    }

    this.produtoParaEditar = produto;
    const modelDiv = document.getElementById('modalEditar');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  CloseModalEditar() {
    const modelDiv = document.getElementById('modalEditar');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  OpenModalNovo() {
    const modelDiv = document.getElementById('modalNovo');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  CloseModalNovo() {
    const modelDiv = document.getElementById('modalNovo');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  OpenModalExcluir(produto: Produto) {
    const modelDiv = document.getElementById('modalExcluir');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  CloseModalExcluir() {
    const modelDiv = document.getElementById('modalExcluir');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }
}
