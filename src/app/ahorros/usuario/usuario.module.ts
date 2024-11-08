import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './usuario.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { UsuarioDashboardComponent } from './components/usuario-dashboard/usuario-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    UsuarioComponent,
    UsuarioFormComponent,
    UsuarioDashboardComponent,
    AuthComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,  
    FormsModule
  ],
  exports: [
    UsuarioComponent,
    UsuarioDashboardComponent
  ]
})
export class UsuarioModule { }
