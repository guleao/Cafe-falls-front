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
  proximoId: number = 1;

  constructor(private produtoService: ProdutoService) {}

  async addProdutoList() {
    try {
      const response = await this.produtoService.adicionarProduto(
        this.novoProduto
      );
    } catch (error) {
      console.log('Erro ao adicionar o produto', error);
    }
  }

  editProduto() {
    this.lista.map;
  }

  async ngOnInit() {
    this.lista = await this.produtoService.getLista();
  }

  OpenModalEditar() {
    const modelDiv = document.getElementById('modalEditar');
    if (modelDiv != null) {
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

  OpenModalExcluir() {
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
