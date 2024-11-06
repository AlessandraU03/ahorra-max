import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarios: Usuario[] = [];
  private nextId = 1;
  public usuarioActual$: Subject<Usuario | null> = new Subject<Usuario | null>();

  private usuarioActual: Usuario | null = null;

  saveUsuario(usuario: Usuario): void {
    this.usuarioActual = usuario;
    localStorage.setItem('usuario', JSON.stringify(usuario)); 
  }

  loginUsuario(correo: string, contrasena: string): Usuario | null {
   const usuario = this.getUsuarioByCorreo(correo);
    if (usuario && usuario.contrasena === contrasena) {
      this.usuarioActual = usuario;
      return usuario;
    }
    return null;
  }

  getUsuario(): Usuario | null {
    if (!this.usuarioActual) {
      this.usuarioActual = this.loadFromLocalStorage();
    }
    return this.usuarioActual;
  }

  getUsuarioByCorreo(correo: string): Usuario | null {
    const usuario = this.loadFromLocalStorage();
    return usuario?.correo === correo ? usuario : null;
  }

  loadFromLocalStorage(): Usuario | null {
    const storedUser = localStorage.getItem('usuario');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  logout(): void {
    this.usuarioActual = null;
    localStorage.removeItem('usuario');
  }
  constructor() {
    this.loadFromLocalStorage();
  }



  private saveToLocalStorage(): void {
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }



  eliminarUsuario(): void {
    this.usuarios = [];
    this.saveToLocalStorage();
    this.usuarioActual$.next(null);
  }
}

