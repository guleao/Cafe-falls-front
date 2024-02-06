import { Component } from '@angular/core';
import { NavbarmesasComponent } from '../../layout/navbars/navbarmesas/navbarmesas.component';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [NavbarmesasComponent],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css',
})
export class PedidoComponent {}
