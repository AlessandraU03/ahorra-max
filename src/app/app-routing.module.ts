// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorrosComponent } from './ahorros/ahorros.component';
import { UsuarioComponent } from './ahorros/usuario/usuario.component';
import { GastoComponent } from './ahorros/gasto/gasto.component';
import { MetaAhorrosComponent } from './ahorros/meta-ahorros/meta-ahorros.component';

const routes: Routes = [
  {
    path: '',
    component: AhorrosComponent,
    children: [
      { path: 'usuario', component: UsuarioComponent },
      { path: 'gasto', component: GastoComponent },
      { path: 'meta-ahorro', component: MetaAhorrosComponent },
      { path: '', redirectTo: 'usuario', pathMatch: 'full' }
    ]
  },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
