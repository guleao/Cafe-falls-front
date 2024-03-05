import { Component } from '@angular/core';
import { NavbarmesasComponent } from '../../layout/navbars/navbarmesas/navbarmesas.component';
import { CommonModule } from '@angular/common';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [NavbarmesasComponent, CommonModule],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css',
})
export class PedidoComponent {
  lista: Produto[] = [];

  constructor(private produtoService: ProdutoService) {}

  async ngOnInit() {
    this.lista = await this.produtoService.getLista();
  }

  filtrar(): void {
    let ul: HTMLUListElement,
      li: HTMLLIElement,
      a: HTMLAnchorElement,
      i: number,
      input: HTMLInputElement,
      filter: string,
      txtValue: string,
      count: number = 0;

    // Pegando elementos
    input = document.getElementById('barraPesquisa') as HTMLInputElement;
    ul = document.getElementById('listaProdutos') as HTMLUListElement;

    //Filtro
    filter = input.value.toUpperCase();

    //Pegar as opções da lista
  }
}
