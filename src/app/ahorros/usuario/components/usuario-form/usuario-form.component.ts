import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent {
  usuario: Usuario = {
    id: 0,
    nombre: '',
    correo: '',
    ingresosMensuales: 0,
    saldoActual: 0,
    contrasena:''
  };
  isRegistering: boolean = true; 

  constructor(private usuarioService: UsuarioService) {}

  toggleMode(): void {
    this.isRegistering = !this.isRegistering;
  }

  submitForm(): void {
    if (this.isRegistering) {
      this.registrarUsuario();
    } else {
    }
  }

  registrarUsuario(): void {
    if (this.validarDatos()) {
      this.usuarioService.saveUsuario(this.usuario);
      alert('Usuario registrado correctamente.');
      this.resetForm();
    } else {
      alert('Por favor, ingresa valores válidos.');
    }
  }


  validarDatos(): boolean {
    return (
      this.usuario.correo !== '' &&
      this.usuario.ingresosMensuales > 0 &&
      this.usuario.saldoActual >= 0
    );
  }

  private resetForm(): void {
    this.usuario = {
      id: 0,
      nombre: '',
      correo: '',
      ingresosMensuales: 0,
      saldoActual: 0,
      contrasena:''
    };
  }
}
