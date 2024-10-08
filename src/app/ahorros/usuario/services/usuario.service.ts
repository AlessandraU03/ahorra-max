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

  saveUsuario(usuario: Usuario): void {
    usuario.id = this.nextId++;
    this.usuarios.push(usuario);
    this.saveToLocalStorage();
    this.usuarioActual$.next(usuario); 
  }

  getUsuario(): Usuario | null {
    return this.usuarios.length ? this.usuarios[0] : null;
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }

  loadFromLocalStorage(): void {
    const usuarios = localStorage.getItem('usuarios');
    if (usuarios) {
      this.usuarios = JSON.parse(usuarios);
      this.nextId = this.usuarios.length ? Math.max(...this.usuarios.map(u => u.id)) + 1 : 1;
    }
  }

  eliminarUsuario(): void {
    this.usuarios = [];
    this.saveToLocalStorage();
    this.usuarioActual$.next(null); 
  }
}
