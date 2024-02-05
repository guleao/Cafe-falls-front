import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbarlista',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbarlista.component.html',
  styleUrl: './navbarlista.component.css',
})
export class NavbarlistaComponent {}
