// gasto-form.component.ts
import { Component } from '@angular/core';
import { GastoService } from '../../services/gasto.service';
import { Gasto } from '../../models/gasto';

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
    if (this.gasto.monto > 0) {  // Validar que el monto no sea 0 o negativo
      this.gastoService.agregarGasto(this.gasto);
      this.resetForm();  // Reiniciar el formulario
    } else {
      alert('El monto debe ser mayor a cero.');
    }
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
