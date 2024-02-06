import { Component } from '@angular/core';
import { NavbarconsultarComponent } from '../../layout/navbars/navbarconsultar/navbarconsultar.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-consultar',
  standalone: true,
  imports: [NavbarconsultarComponent, RouterLink, RouterLinkActive],
  templateUrl: './consultar.component.html',
  styleUrl: './consultar.component.css',
})
export class ConsultarComponent {}
