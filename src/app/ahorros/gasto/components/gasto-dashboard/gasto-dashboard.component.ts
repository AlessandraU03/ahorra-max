import { Component, OnInit } from '@angular/core';
import { GastoService } from '../../services/gasto.service';
import { Gasto } from '../../models/gasto';

@Component({
  selector: 'app-gasto-dashboard',
  templateUrl: './gasto-dashboard.component.html'
})
export class GastoDashboardComponent implements OnInit {
  gastos: Gasto[] = [];

  constructor(private gastoService: GastoService) {}

  ngOnInit(): void {
    this.loadGastos();
  }

  private loadGastos(): void {
    this.gastos = this.gastoService.getGastos();
  }
}
