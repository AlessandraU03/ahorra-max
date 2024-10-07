// gasto.service.ts
import { Injectable } from '@angular/core';
import { Gasto } from '../models/gasto';

@Injectable({
  providedIn: 'root'
})
export class GastoService {
  private gastos: Gasto[] = [];
  private nextId = 1;

  constructor() {
    this.loadFromLocalStorage(); 
  }

  agregarGasto(gasto: Gasto): void {
    gasto.id = this.nextId++;
    this.gastos.push(gasto);
    this.saveToLocalStorage();
  }

  getGastos(): Gasto[] {
    return this.gastos;
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('gastos', JSON.stringify(this.gastos));
  }

  private loadFromLocalStorage(): void {
    const gastos = localStorage.getItem('gastos');
    if (gastos) {
      this.gastos = JSON.parse(gastos);
      this.nextId = this.gastos.length ? Math.max(...this.gastos.map(g => g.id)) + 1 : 1;
    }
  }

  eliminarGasto(id: number): void {
    this.gastos = this.gastos.filter(gasto => gasto.id !== id);
    this.saveToLocalStorage();
  }

  eliminarTodosGastos(): void {
    this.gastos = [];
    this.saveToLocalStorage();
  }
}
