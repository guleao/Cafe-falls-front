import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuinicioComponent } from './pages/menuinicio/menuinicio.component';
import { VendasComponent } from './pages/vendas/vendas.component';
import { MenuestoqueComponent } from './pages/menuestoque/menuestoque.component';
import { ListaComponent } from './pages/lista/lista.component';
import { EntradaitemComponent } from './pages/entradaitem/entradaitem.component';
import { PedidoComponent } from './pages/pedido/pedido.component';
import { FinanceiroComponent } from './pages/financeiro/financeiro.component';
import { ConsultarComponent } from './pages/consultar/consultar.component';
import { CompararComponent } from './pages/comparar/comparar.component';

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
  {
    path: 'estoque',
    component: MenuestoqueComponent,
  },
  {
    path: 'lista',
    component: ListaComponent,
  },
  {
    path: 'entrada',
    component: EntradaitemComponent,
  },
  {
    path: 'pedido',
    component: PedidoComponent,
  },
  {
    path: 'financeiro',
    component: FinanceiroComponent,
  },
  {
    path: 'consultar',
    component: ConsultarComponent,
  },
  {
    path: 'comparar',
    component: CompararComponent,
  },
];
