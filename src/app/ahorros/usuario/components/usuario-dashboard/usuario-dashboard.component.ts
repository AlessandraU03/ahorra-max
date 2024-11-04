import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-dashboard',
  templateUrl: './usuario-dashboard.component.html',
  styleUrls: ['./usuario-dashboard.component.css']
})
export class UsuarioDashboardComponent implements OnInit, OnDestroy {
  usuario: Usuario | null = null;
  private usuarioSubscription: Subscription = new Subscription();
  isEditing: boolean = false;

  constructor(private usuarioService: UsuarioService) {
    this.usuario = null; 
  }

  ngOnInit(): void {
    this.cargarUsuarioActual();
  }

  cargarUsuarioActual(): void {
    const usuarioId= 11; 
    this.usuarioService.leerUsuario(usuarioId).subscribe({
      next: (usuario) => {
        this.usuario = usuario;
      },
      error: () => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo cargar el usuario. Inténtalo nuevamente.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  guardarCambios(): void {
    if (this.usuario) {
      this.usuarioService.actualizarUsuario(this.usuario.id, this.usuario).subscribe({
        next: (updatedUsuario) => {
          this.usuario = updatedUsuario; // Actualizar el usuario en el componente
          Swal.fire({
            title: '¡Éxito!',
            text: 'Los cambios han sido guardados correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.isEditing = false; // Salir del modo de edición
        },
        error: () => {
          Swal.fire({
            title: 'Error',
            text: 'No se pudieron guardar los cambios. Inténtalo nuevamente.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    }
  }

  ngOnDestroy(): void {
    // Limpiar la suscripción si se estaba utilizando
    if (this.usuarioSubscription) {
      this.usuarioSubscription.unsubscribe(); 
    }
  }

  eliminarUsuario(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminado, no podrás recuperar este usuario.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed && this.usuario) {
        this.usuarioService.eliminarUsuario(this.usuario.id).subscribe({
          next: () => {
            Swal.fire({
              title: '¡Eliminado!',
              text: 'El usuario ha sido eliminado correctamente.',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            this.usuario = null; // Limpiar el usuario en el componente
          },
          error: () => {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar el usuario. Inténtalo nuevamente.',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        });
      }
    });
  }
}
