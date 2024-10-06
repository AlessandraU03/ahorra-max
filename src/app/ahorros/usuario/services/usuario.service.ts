import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarios: Usuario[] = [];

  constructor() { 
    this.loadUsuarios();
  }

  saveUsuario(usuario: Usuario): void {
    this.usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }

  getUsuarios(): Usuario[] {
    return this.usuarios;
  }

  private loadUsuarios(): void {
    const usuarios = localStorage.getItem('usuarios');
    if (usuarios) {
      this.usuarios = JSON.parse(usuarios);
    }
  }
}
