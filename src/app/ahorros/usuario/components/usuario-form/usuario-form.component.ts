import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html'
})
export class UsuarioFormComponent implements OnInit {
  usuario: Usuario = {
    id: Date.now(),  // Genera un ID basado en la fecha y hora actual
    nombre: '',
    correo: '',
    ingresosMensuales: 0,
    presupuestoMensual: 0,
    saldoActual: 0,
    tipoCuenta: ''
  };

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {}

  agregarUsuario(): void {
    this.usuario.id = Date.now();  // Genera un nuevo ID antes de guardar el usuario
    this.usuarioService.saveUsuario(this.usuario);
    this.usuario = {
      id: Date.now(),  // Asegura que se cree un nuevo ID para el siguiente usuario
      nombre: '',
      correo: '',
      ingresosMensuales: 0,
      presupuestoMensual: 0,
      saldoActual: 0,
      tipoCuenta: ''
    };
  }
}
