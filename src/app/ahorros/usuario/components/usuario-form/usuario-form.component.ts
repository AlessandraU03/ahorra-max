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
    presupuestoMensual: 0,
    saldoActual: 0,

  };

  constructor(private usuarioService: UsuarioService) {}

  agregarUsuario(): void {
    if (this.validarDatos()) {
      this.usuarioService.saveUsuario(this.usuario);
      this.usuario = {
        id: 0,
        nombre: '',
        correo: '',
        ingresosMensuales: 0,
        presupuestoMensual: 0,
        saldoActual: 0,

      };
    } else {
      alert('Por favor, ingresa valores válidos.');
    }
  }

  validarDatos(): boolean {
    return (
      this.usuario.ingresosMensuales > 0 &&
      this.usuario.presupuestoMensual > 0 &&
      this.usuario.saldoActual >= 0 
    );
  }
}