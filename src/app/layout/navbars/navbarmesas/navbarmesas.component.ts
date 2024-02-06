import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbarmesas',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbarmesas.component.html',
  styleUrl: './navbarmesas.component.css',
})
export class NavbarmesasComponent {}
