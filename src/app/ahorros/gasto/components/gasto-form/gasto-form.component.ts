import { Component } from '@angular/core';
import { GastoService } from '../../services/gasto.service';
import { Gasto } from '../../models/gasto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gasto-form',
  templateUrl: './gasto-form.component.html',
  styleUrls: ['./gasto-form.component.css']
})
export class GastoFormComponent {
  gasto: Gasto = {
    id: 0,
    descripcion: '',
    categoria: '',
    monto: 0,
    fecha: new Date(),
    metodoPago: '',
    frecuencia: ''
  };

  constructor(private gastoService: GastoService) {}

  agregarGasto(): void {
    if (this.validarGasto()) {
      this.gastoService.creargasto(this.gasto).subscribe({
        next: () => {
          this.resetForm();
          Swal.fire({
            title: '¡Éxito!',
            text: 'El gasto ha sido registrado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
        },
        error: (error) => {
          console.error('Error al agregar el gasto:', error);
          Swal.fire({
            title: 'Error',
            text: 'No se pudo registrar el gasto. Inténtalo de nuevo.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    }
  }

  validarGasto(): boolean {
    if (!this.gasto.descripcion || !this.gasto.categoria || this.gasto.monto <= 0 ||
        !this.gasto.fecha || !this.gasto.metodoPago || !this.gasto.frecuencia) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, completa todos los campos obligatorios.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return false; 
    }
    return true; 
  }

  resetForm(): void {
    this.gasto = {
      id: 0,
      descripcion: '',
      categoria: '',
      monto: 0,
      fecha: new Date(),
      metodoPago: '',
      frecuencia: ''
    };
  }
}
