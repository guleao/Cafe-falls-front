import { Component, OnInit } from '@angular/core';
import { NavbarlistaComponent } from '../../layout/navbars/navbarlista/navbarlista.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

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
}
