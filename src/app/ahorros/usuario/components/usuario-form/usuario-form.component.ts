import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent {
  usuario: Usuario = {
    id: 0,
    nombre: '',
    email: '',
    saldoActual: 0,
  };

  constructor(private usuarioService: UsuarioService) {}

  agregarUsuario(): void {
    if (this.validarDatos()) {
      this.usuarioService.crearUsuario(this.usuario).subscribe({
        next: (response) => {
          Swal.fire({
            title: '¡Éxito!',
            text: 'El usuario ha sido registrado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.resetForm();
        },
        error: (error) => {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo registrar el usuario. Inténtalo nuevamente.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
          console.error('Error al registrar usuario:', error);
        }
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, ingresa valores válidos.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  validarDatos(): boolean {
    const nombreValido = this.usuario.nombre.trim() !== '';
    const correoValido = this.validarEmail(this.usuario.email);
    const saldoValido = this.usuario.saldoActual >= 0;

    return nombreValido && correoValido && saldoValido;
  }

  validarEmail(correo: string): boolean {
    const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return patron.test(correo);
  }

  private resetForm(): void {
    this.usuario = {
      id: 0,
      nombre: '',
      email: '',
      saldoActual: 0,
    };
  }
}
