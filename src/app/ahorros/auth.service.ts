import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000'; // Cambia esto a la URL de tu API de FastAPI

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  register(usuario: { nombre: string; email: string; password: string; saldoActual?: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, usuario);
  }



}