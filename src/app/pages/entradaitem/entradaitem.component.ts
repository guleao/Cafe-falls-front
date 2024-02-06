import { Component } from '@angular/core';
import { NavbarlistaComponent } from '../../layout/navbars/navbarlista/navbarlista.component';

@Component({
  selector: 'app-entradaitem',
  standalone: true,
  imports: [NavbarlistaComponent],
  templateUrl: './entradaitem.component.html',
  styleUrl: './entradaitem.component.css',
})
export class EntradaitemComponent {}
