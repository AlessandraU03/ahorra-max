// register.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService) {}

  register() {
    const success = this.authService.register(this.username, this.password);
    this.message = success ? 'Registro exitoso!' : 'El usuario ya existe.';
  }
}
