import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbarvendas',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbarvendas.component.html',
  styleUrl: './navbarvendas.component.css',
})
export class NavbarvendasComponent {}
