import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuario-dashboard',
  templateUrl: './usuario-dashboard.component.html',
  styleUrls: ['./usuario-dashboard.component.css']
})
export class UsuarioDashboardComponent implements OnInit, OnDestroy {
  usuario: Usuario | null = null;
  private usuarioSubscription: Subscription;
  isEditing: boolean = false;

  constructor(private usuarioService: UsuarioService) {
    this.usuarioSubscription = this.usuarioService.usuarioActual$.subscribe(usuario => {
      this.usuario = usuario; 
    });
  }

  ngOnInit(): void {
    this.usuarioService.loadFromLocalStorage();
    this.usuario = this.usuarioService.getUsuario();
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

  ngOnDestroy(): void {
    this.usuarioSubscription.unsubscribe(); // Limpiar la suscripción
  }

  eliminarUsuario(): void {
    this.usuarioService.eliminarUsuario();
  
}
}
