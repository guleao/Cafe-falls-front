import { Component } from '@angular/core';
import { NavbarvendasComponent } from '../../layout/navbars/navbarvendas/navbarvendas.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor } from '@angular/common';
import { MesaService } from '../../services/mesa.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vendas',
  standalone: true,
  imports: [
    NavbarvendasComponent,
    RouterLink,
    RouterLinkActive,
    NgFor,
    FormsModule,
  ],
  templateUrl: './vendas.component.html',
  styleUrl: './vendas.component.css',
})
export class VendasComponent {
  mesas: { id: number; nome: string; isChecked: boolean }[] = [];

  constructor(private mesaService: MesaService) {}

  ngOnInit() {
    this.mesas = this.mesaService.getMesas();
  }
}
