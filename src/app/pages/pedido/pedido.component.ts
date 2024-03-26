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
import { FormsModule } from '@angular/forms';
import { ItemPedido } from '../../models/itempedido';
import { Pedido } from '../../models/pedido';
import { PedidoService } from '../../services/pedido.service';

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
  listaProdutosPedido: Produto[] = [];
  itensPedido: ItemPedido[] = [];
  pedido: Pedido = new Pedido(0, 0, '', 0, '');
  pedidosFinalizados: Pedido[] = [];

  constructor(
    private produtoService: ProdutoService,
    private mesaService: MesaService,
    private categoriaService: CategoriaService,
    private pedidoService: PedidoService,
    private route: ActivatedRoute
  ) {
    this.mesaService.mesaAtual.subscribe((mesa) => {
      this.mesaAtual = mesa;
      console.log('Mesa atual:', this.mesaAtual);
    });
    this.pedido.formasdePagamento = [
      'Dinheiro',
      'Cartão de Crédito',
      'Cartão de Débito',
      'Pix',
    ];
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
    const itemExistente = this.itensPedido.find(
      (item) => item.produto.idProduto === produto.idProduto
    );
    if (itemExistente) {
      itemExistente.quantidade++;
    } else {
      this.itensPedido.push(new ItemPedido(produto));
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
      await this.pedidoService.finalizarPedido(this.pedido.idPedido);
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
