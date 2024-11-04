import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  authForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.authForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onRegister() {
    if (this.authForm.valid) {
      const { nombre, email, password } = this.authForm.value;
      this.authService.register(nombre).subscribe({
        next: () => {
          // Registro exitoso, puedes redirigir o mostrar un mensaje
          this.router.navigate(['/']); // Redirigir al Dashboard o a la ruta principal
        },
        error: (err) => {
          this.errorMessage = err.error.detail; // Muestra el error
        }
      });
    }
  }

  onLogin() {
    if (this.authForm.valid) {
      const { email, password } = this.authForm.value;
      this.authService.login(email, password).subscribe({
        next: (data) => {
          // Guarda el token en localStorage
          localStorage.setItem('access_token', data.access_token);
          this.router.navigate(['/']); // Redirigir al Dashboard o a la ruta principal
        },
        error: (err) => {
          this.errorMessage = err.error.detail; // Muestra el error
        }
      });
    }
  }
}
