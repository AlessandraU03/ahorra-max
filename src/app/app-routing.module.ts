import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorrosComponent } from './ahorros/ahorros.component';
import { UsuarioComponent } from './ahorros/usuario/usuario.component';
import { GastoComponent } from './ahorros/gasto/gasto.component';
import { MetaAhorrosComponent } from './ahorros/meta-ahorros/meta-ahorros.component';
import { AuthComponent } from './ahorros/usuario/auth/auth.component';
import { UsuarioDashboardComponent } from './ahorros/usuario/components/usuario-dashboard/usuario-dashboard.component';
import { AuthGuard } from './ahorros/usuario/auth/guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'dashboard', component: UsuarioDashboardComponent, canActivate: [AuthGuard] },
  {
    path: '',
    component: AhorrosComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'usuario', component: UsuarioComponent },
      { path: 'gasto', component: GastoComponent },
      { path: 'meta-ahorro', component: MetaAhorrosComponent },
      { path: '', redirectTo: 'usuario', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
