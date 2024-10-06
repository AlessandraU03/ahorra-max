import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioDashboardComponent } from './components/usuario-dashboard/usuario-dashboard.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UsuarioDashboardComponent,
    UsuarioFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [UsuarioDashboardComponent, UsuarioFormComponent]
})
export class UsuarioModule { }
