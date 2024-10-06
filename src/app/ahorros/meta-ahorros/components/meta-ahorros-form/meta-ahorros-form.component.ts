import { Component } from '@angular/core';
import { MetaAhorrosService } from '../../services/meta-ahorros.service';
import { MetaAhorros } from '../../models/meta-ahorros';

@Component({
  selector: 'app-meta-ahorros-form',
  templateUrl: './meta-ahorros-form.component.html'
})
export class MetaAhorrosFormComponent {
  meta: MetaAhorros = {
    nombre: '',
    montoObjetivo: 0,
    fechaLimite: '',
    progreso: 0,
    estado: ''
  };

  constructor(private metaAhorrosService: MetaAhorrosService) {}

  agregarMeta(): void {
    this.metaAhorrosService.saveMeta(this.meta);
    this.meta = {
      nombre: '',
      montoObjetivo: 0,
      fechaLimite: '',
      progreso: 0,
      estado: ''
    };
  }
}
