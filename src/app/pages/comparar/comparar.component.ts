import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarconsultarComponent } from '../../layout/navbars/navbarconsultar/navbarconsultar.component';

@Component({
  selector: 'app-comparar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NavbarconsultarComponent],
  templateUrl: './comparar.component.html',
  styleUrl: './comparar.component.css',
})
export class CompararComponent {}
