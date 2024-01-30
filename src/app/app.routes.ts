import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuinicioComponent } from './pages/menuinicio/menuinicio.component';
import { VendasComponent } from './pages/vendas/vendas.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'menu',
    component: MenuinicioComponent,
  },
  {
    path: 'vendas',
    component: VendasComponent,
  },
];
