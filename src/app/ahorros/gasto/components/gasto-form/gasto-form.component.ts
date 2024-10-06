import { Component } from '@angular/core';
import { GastoService } from '../../services/gasto.service';
import { Gasto } from '../../models/gasto';

@Component({
  selector: 'app-gasto-form',
  templateUrl: './gasto-form.component.html'
})
export class GastoFormComponent {
  gasto: Gasto = {
    descripcion: '',
    categoria: '',
    monto: 0,
    fecha: '',
    metodoPago: '',
    frecuencia: ''
  };

  constructor(private gastoService: GastoService) {}

  agregarGasto(): void {
    this.gastoService.saveGasto(this.gasto);
    this.gasto = {
      descripcion: '',
      categoria: '',
      monto: 0,
      fecha: '',
      metodoPago: '',
      frecuencia: ''
    };
  }
}
