import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  
  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (data) => {
          localStorage.setItem('access_token', data.access_token); // Guarda el token
          
          // Almacena también la información del usuario
          localStorage.setItem('usuarioId', data.user.id.toString()); // Almacena el ID del usuario
          localStorage.setItem('usuarioNombre', data.user.nombre);
          localStorage.setItem('usuarioEmail', data.user.email);
  
          this.router.navigate(['/ahorros']); // Redirige a la sección de ahorros tras iniciar sesión
        },
        error: (err) => {
          this.errorMessage = err.error.detail; // Muestra el error
        }
      });
    }
  }
}
