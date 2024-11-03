// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: any[] = []; // Esto es solo para demostración, puedes usar una base de datos o API real.

  constructor() { }

  register(username: string, password: string): boolean {
    const existingUser = this.users.find(user => user.username === username);
    if (existingUser) {
      return false; // Usuario ya existe
    }
    this.users.push({ username, password });
    return true; // Registro exitoso
  }

  login(username: string, password: string): boolean {
    const user = this.users.find(user => user.username === username && user.password === password);
    return !!user; // Devuelve verdadero si el usuario existe y la contraseña es correcta
  }
}
