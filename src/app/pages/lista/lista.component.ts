import { Component, OnInit } from '@angular/core';
import { NavbarlistaComponent } from '../../layout/navbars/navbarlista/navbarlista.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Produto } from '../../models/produto';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { ProdutoService } from '../../services/produto.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [
    NavbarlistaComponent,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    FormsModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
  ],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css',
})
export class ListaComponent implements OnInit {
  // Variáveis de Estado da Lista de Produtos
  lista: Produto[] = [];
  produtosPaginados: Produto[] = [];
  listaFiltrada: Produto[] = [];
  novoProduto: Produto = new Produto(0, '', 0, 0, 0, '', '', 0);
  produtoParaEditar: Produto = new Produto(0, '', 0, 0, 0, '', '', 0);
  produtoParaExcluir: Produto = new Produto(0, '', 0, 0, 0, '', '', 0);

  // Variáveis de Paginação e Filtragem
  produtosPorPagina = 30;
  termoDePesquisa: string = '';

  // Variáveis de Observação e Desinscrição
  categorias: { [key: number]: string } = {
    1: 'Bebidas',
    2: 'Cafés',
    3: 'Gelados',
    4: 'Salgados',
    5: 'Especiais',
    6: 'Bolos',
  };

  idCategorias: number[] = [1, 2, 3, 4, 5, 6];

  form: FormGroup = new FormGroup({
    Nome_produto: new FormControl(null),
    Descricao: new FormControl(null),
    Preco_venda: new FormControl(null),
    Preco_compra: new FormControl(null),
    Preco_lojista: new FormControl(null),
    idCategoria: new FormControl(null),
  });

  constructor(private produtoService: ProdutoService) {}

  ngOnInit() {
    this.obterListaProdutos();
  }

  // Métodos relacionados à lista de produtos

  async obterListaProdutos() {
    try {
      this.lista = await this.produtoService.getLista();
      this.atualizarListaFiltrada();
      console.log(this.lista.map((produto) => produto.idCategoria));
    } catch (error) {
      console.error('Erro ao obter lista de produtos:', error);
    }
  }

  atualizarListaFiltrada() {
    if (this.lista && this.lista.length > 0) {
      this.listaFiltrada = this.lista.filter((produto) => {
        return (
          produto.Nome_produto.toLowerCase().includes(
            this.termoDePesquisa.toLowerCase()
          ) ||
          produto.Descricao.toLowerCase().includes(
            this.termoDePesquisa.toLowerCase()
          )
        );
      });
    }
  }
  // Métodos relacionados à adição, edição e exclusão de produtos

  adicionarNovoProduto() {
    if (this.form.valid) {
      this.produtoService
        .adicionarProduto(this.form.value)
        .then(() => {
          console.log('Produto adicionado com sucesso');
          this.form.reset(); // Limpa o formulário após a submissão bem-sucedida
          this.obterListaProdutos();
        })
        .catch((error) => {
          console.error('Erro ao adicionar produto:', error);
        });
    } else {
      console.error('Formulário inválido');
    }
  }

  editarProduto() {
    if (!this.produtoParaEditar) {
      console.log('Nenhum produto selecionado para edição');
      return;
    }

    this.produtoService.editarProduto(this.produtoParaEditar).then(() => {
      this.obterListaProdutos();
    });
  }

  selecionarProdutoParaExcluir(produto: Produto) {
    this.produtoParaExcluir = produto;
  }

  excluirProduto() {
    if (!this.produtoParaExcluir) {
      console.log('Nenhum produto selecionado para exclusão');
      return;
    }

    this.produtoService
      .excluirProduto(this.produtoParaExcluir.idProduto)
      .then(() => {
        this.obterListaProdutos();
      });
  }

  // Métodos relacionados aos modais
  OpenModalEditar(produto: Produto) {
    if (!produto) {
      console.log('Nenhum produto fornecido');
      return;
    }

    this.produtoParaEditar = produto;
    const modelDiv = document.getElementById('modalEditar');
    if (modelDiv !== null) {
      modelDiv.style.display = 'block';
    }
  }

  CloseModalEditar() {
    const modelDiv = document.getElementById('modalEditar');
    if (modelDiv !== null) {
      modelDiv.style.display = 'none';
    }
  }

  OpenModalNovo() {
    const modelDiv = document.getElementById('modalNovo');
    if (modelDiv !== null) {
      modelDiv.style.display = 'block';
    }
  }

  CloseModalNovo() {
    const modelDiv = document.getElementById('modalNovo');
    if (modelDiv !== null) {
      modelDiv.style.display = 'none';
    }
  }

  OpenModalExcluir(produto: Produto) {
    this.produtoParaExcluir = produto;
    const modelDiv = document.getElementById('modalExcluir');
    if (modelDiv !== null) {
      modelDiv.style.display = 'block';
    }
  }

  CloseModalExcluir() {
    const modelDiv = document.getElementById('modalExcluir');
    if (modelDiv !== null) {
      modelDiv.style.display = 'none';
    }
  }
}
