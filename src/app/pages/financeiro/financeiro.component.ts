import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarvendasComponent } from '../../layout/navbars/navbarvendas/navbarvendas.component';

@Component({
  selector: 'app-financeiro',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NavbarvendasComponent],
  templateUrl: './financeiro.component.html',
  styleUrl: './financeiro.component.css',
})
export class FinanceiroComponent {}
