import { Component, OnInit } from '@angular/core';
import { NavbarmesasComponent } from '../../layout/navbars/navbarmesas/navbarmesas.component';
import { CommonModule } from '@angular/common';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto.service';
import { Categorias } from '../../models/categorias';
import { CategoriaService } from '../../services/categorias.service';
import { FormsModule } from '@angular/forms';
import { ItemPedido } from '../../models/itempedido';
import { Pedido } from '../../models/pedido';
import { PedidoService } from '../../services/pedido.service';
import { PedidoPost } from '../../models/itempedido';

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
  visualizandoProdutos = false;
  pesquisa: string = '';
  listaProdutosFiltrados: Produto[] = [];
  listaProdutosPedido: Produto[] = [];
  itensPedido: ItemPedido[] = [];
  pedido: Pedido = new Pedido(0, '', 0, '');
  pedidosFinalizados: Pedido[] = [];
  dataAtual = new Date();

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    public pedidoService: PedidoService
  ) {}

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
    const itemExistente = this.itensPedido.find(
      (item) => item.produto.idProduto === produto.idProduto
    );
    if (itemExistente) {
      itemExistente.quantidade++;
    } else {
      this.itensPedido.push(new ItemPedido(produto, 1)); // Remova produto.idProduto
    }
    this.pedido.Valor_total += produto.Preco_venda;
  }

  removerItem(index: number) {
    if (this.itensPedido[index].quantidade > 1) {
      this.itensPedido[index].quantidade -= 1;
      this.pedido.Valor_total -= this.itensPedido[index].produto.Preco_venda;
    } else {
      this.pedido.Valor_total -= this.itensPedido[index].produto.Preco_venda;
      this.itensPedido.splice(index, 1);
    }
  }

  limparPedido() {
    this.itensPedido = [];
    this.pedido.Valor_total = 0;
  }

  CloseModalPagamento() {
    const modelDiv = document.getElementById('modalPagamento');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  OpenModalPagamento() {
    const modelDiv = document.getElementById('modalPagamento');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  async finalizarPedido(): Promise<void> {
    if (!this.pedido) {
      alert('Pedido inválido');
      return;
    }
    try {
      // Se o idPedido for 0, gere um novo ID
      if (this.pedido.idPedido === 0) {
        this.pedido.idPedido = await this.pedidoService.getNextId();
      }
      this.pedido.Data = new Date()
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');

      // Crie um novo objeto pedido com apenas as propriedades que você deseja enviar
      const pedidoPost: PedidoPost = {
        pedido: {
          idPedido: this.pedido.idPedido,
          Data: this.pedido.Data,
          Valor_total: this.pedido.Valor_total,
          Forma_pagamento: this.pedido.Forma_pagamento,
          Obs: this.pedido.Obs,
          itens: this.pedido.itens, // Adicione esta linha
        },
        itens: this.itensPedido.map((item) => ({
          Quantidade: item.quantidade,
          Total_soma: item.quantidade * item.produto.Preco_venda,
          idProduto: item.produto.idProduto,
        })),
      };

      // Chame o método adicionarPedidoPost
      await this.pedidoService.adicionarPedidoPost(pedidoPost);

      alert('Pedido finalizado com sucesso!');
      // Atualize a lista de pedidos finalizados
      this.pedidosFinalizados =
        await this.pedidoService.getPedidosFinalizados();
    } catch (error) {
      console.error('Erro ao finalizar o pedido', error);
      alert('Erro ao finalizar o pedido');
    }
  }
}
