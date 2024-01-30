import { Component } from '@angular/core';
import { NavbarmenuinicioComponent } from '../../layout/navbars/navbarmenuinicio/navbarmenuinicio.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menuinicio',
  standalone: true,
  imports: [NavbarmenuinicioComponent, RouterLink, RouterLinkActive],
  templateUrl: './menuinicio.component.html',
  styleUrl: './menuinicio.component.css',
})
export class MenuinicioComponent {}
