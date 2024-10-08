import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './usuario.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { UsuarioDashboardComponent } from './components/usuario-dashboard/usuario-dashboard.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UsuarioComponent,
    UsuarioFormComponent,
    UsuarioDashboardComponent // Declarar el nuevo componente
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    UsuarioComponent,
    UsuarioDashboardComponent // Exportar el nuevo componente si es necesario
  ]
})
export class UsuarioModule { }
