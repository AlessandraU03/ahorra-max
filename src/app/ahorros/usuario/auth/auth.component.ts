import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  usuario: Usuario = {
    id: 0,
    nombre: '',
    correo: '',
    ingresosMensuales: 0,
    saldoActual: 0,        
    contrasena: ''
  };
  isRegistering: boolean = false; 

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  toggleMode(): void {
    this.isRegistering = !this.isRegistering;
  }

  submitForm(): void {
    if (this.isRegistering) {
      this.registrarUsuario();
    } else {
      this.loginUsuario();
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

  loginUsuario(): void {
    const usuarioEncontrado = this.usuarioService.loginUsuario(this.usuario.correo, this.usuario.contrasena);
    if (usuarioEncontrado) {
      alert('Inicio de sesión exitoso.');
      this.router.navigate(['/usuario']); 
    } else {
      alert('Correo o contraseña incorrectos. Por favor, regístrate primero.');
    }
  }

  validarDatos(): boolean {
    return (
      this.usuario.correo !== '' &&
      this.usuario.contrasena !== '' &&
      (this.isRegistering ? this.usuario.nombre !== '' : true) 
    );
  }

  private resetForm(): void {
    this.usuario = {
      id: 0,
      nombre: '',
      correo: '',
      ingresosMensuales: 0,  
      saldoActual: 0,        
      contrasena: ''
    };
  }
}
