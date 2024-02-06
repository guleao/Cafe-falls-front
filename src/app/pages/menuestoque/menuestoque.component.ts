import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  Output,
  ViewChild,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarvendasComponent } from '../../layout/navbars/navbarvendas/navbarvendas.component';
import { Produto } from '../../models/produto';
import { FormsModule } from '@angular/forms';
import { ListaComponent } from '../lista/lista.component';
import { ProdutoService } from '../../services/produto.service';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-menuestoque',
  standalone: true,
  imports: [
    NavbarvendasComponent,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    ListaComponent,
    CommonModule,
  ],
  templateUrl: './menuestoque.component.html',
  styleUrl: './menuestoque.component.css',
})
export class MenuestoqueComponent {
  idInserido: number | null = null;
  produtoParaEditar: Produto | null | undefined = null;
  modalEditarInstance: any;

  @ViewChild('modalEditar') modalEditar!: ElementRef;

  ngAfterViewInit() {
    this.modalEditarInstance = new bootstrap.Modal(
      this.modalEditar.nativeElement
    );
  }

  OpenModalEditar() {
    if (this.idInserido !== null) {
      this.produtoParaEditar = this.ProdutoService.getProdutoId(
        this.idInserido
      );
      if (this.produtoParaEditar) {
        this.modalEditarInstance.show();
      } else {
        console.log('Erro: Produto não encontrado');
      }
    }
  }

  CloseModalEditar() {
    const modelDiv = document.getElementById('modalEditar');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
    this.CloseModalColocarId();
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

  OpenModalPerca() {
    const modelDiv = document.getElementById('modalPerca');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  CloseModalPerca() {
    const modelDiv = document.getElementById('modalPerca');
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

  OpenModalColocarId() {
    const modelDiv = document.getElementById('modalColocarId');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  CloseModalColocarId() {
    const modelDiv = document.getElementById('modalColocarId');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  /* INICIO DO CÓDIGO PARA AS MODALS FUNCIONAREM */

  Nome_produto = '';
  Descricao = '';
  Preco_compra = 0;
  Preco_venda = 0;

  constructor(private ProdutoService: ProdutoService) {
    this.produtoParaEditar = new Produto(0, '', '', 0, 0);
  }

  adicionarProdutoALista() {
    const id = this.ProdutoService.getProximoId();
    if (this.Nome_produto.trim() !== '') {
      let novoProduto = new Produto(
        id,
        this.Nome_produto,
        this.Descricao,
        this.Preco_compra,
        this.Preco_venda
      );

      this.ProdutoService.adicionarProduto(novoProduto);

      this.Nome_produto = '';
      this.Descricao = '';
      this.Preco_compra = 0;
      this.Preco_venda = 0;
    }

    const modelDiv = document.getElementById('modalNovo');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  /* Atualizar produto */
}
