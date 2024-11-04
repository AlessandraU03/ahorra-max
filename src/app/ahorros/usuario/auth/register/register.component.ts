import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      saldoActual: [0, [Validators.required, Validators.min(0)]] // Inicializa a 0 y valida que sea no negativo
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { nombre, email, password, saldoActual } = this.registerForm.value;
      this.authService.register({ nombre, email, password, saldoActual }).subscribe({
        next: (usuario) => {
          // Guarda el usuario en localStorage
          localStorage.setItem('usuarioId', usuario.id.toString());
          localStorage.setItem('usuarioNombre', nombre);
          localStorage.setItem('usuarioEmail', email);
          this.router.navigate(['/auth/login']); // Redirige a la página de login después de registrar
        },
        error: (err) => {
          this.errorMessage = err.error.detail; // Muestra el error
        }
      });
    }
  }
  
}  