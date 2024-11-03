// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService) {}

  login() {
    const success = this.authService.login(this.username, this.password);
    this.message = success ? 'Inicio de sesión exitoso!' : 'Usuario o contraseña incorrectos.';
  }
}
