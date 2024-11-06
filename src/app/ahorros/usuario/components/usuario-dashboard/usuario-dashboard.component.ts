import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-dashboard',
  templateUrl: './usuario-dashboard.component.html',
  styleUrls: ['./usuario-dashboard.component.css']
})
export class UsuarioDashboardComponent implements OnInit, OnDestroy {
  usuario: Usuario | null = null;
  private usuarioSubscription: Subscription;
  isEditing: boolean = false;

  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.usuarioSubscription = this.usuarioService.usuarioActual$.subscribe(usuario => {
      this.usuario = usuario;
    });
  }

  ngOnInit(): void {
    this.usuario = this.usuarioService.getUsuario();
    if (!this.usuario) {
      this.router.navigate(['/login']);
    }
  }
  
  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  guardarCambios(): void {
    if (this.usuario) {
      this.usuarioService.saveUsuario(this.usuario);
      this.isEditing = false;
    }
  }

  eliminarUsuario(): void {
    this.usuarioService.eliminarUsuario();
    alert('Usuario eliminado correctamente.');
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.usuarioSubscription.unsubscribe();
  }
}
