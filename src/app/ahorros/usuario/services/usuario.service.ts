import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://127.0.0.1:8000'; // URL de tu API FastAPI

  constructor(private http: HttpClient) { }

  // Métodos CRUD para Usuario
  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios/`, usuario);
  }

  listarUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios/`);
  }

  leerUsuario(usuarioId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuarios/${usuarioId}`);
  }

  actualizarUsuario(usuarioId: number, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/usuarios/${usuarioId}`, usuario);
  }

  eliminarUsuario(usuarioId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/usuarios/${usuarioId}`);
  }
}
