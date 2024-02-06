import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbarconsultar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbarconsultar.component.html',
  styleUrl: './navbarconsultar.component.css',
})
export class NavbarconsultarComponent {}
