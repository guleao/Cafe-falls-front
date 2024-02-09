import { Component, OnInit } from '@angular/core';
import { NavbarlistaComponent } from '../../layout/navbars/navbarlista/navbarlista.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Produto } from '../../models/produto';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [NavbarlistaComponent, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css',
})
export class ListaComponent implements OnInit {
  lista: Produto[] = [];

  constructor(private produtoService: ProdutoService) {}

  async ngOnInit() {
    this.lista = await this.produtoService.getLista();
  }

  Nome_produto = '';
  Descricao = '';
  Preco_compra = 0;
  Preco_venda = 0;

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
      modelDiv.style.display = 'none';
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
