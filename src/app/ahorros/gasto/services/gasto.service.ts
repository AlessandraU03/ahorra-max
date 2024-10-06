import { Injectable } from '@angular/core';
import { Gasto } from '../models/gasto';

@Injectable({
  providedIn: 'root'
})
export class GastoService {
  private gastos: Gasto[] = [];

  constructor() { 
    this.loadGastos();
  }

  saveGasto(gasto: Gasto): void {
    this.gastos.push(gasto);
    localStorage.setItem('gastos', JSON.stringify(this.gastos));
  }

  getGastos(): Gasto[] {
    return this.gastos;
  }

  private loadGastos(): void {
    const gastos = localStorage.getItem('gastos');
    if (gastos) {
      this.gastos = JSON.parse(gastos);
    }
  }
}
