import { Component } from '@angular/core';
import { GastoService } from '../../services/gasto.service';
import { Gasto } from '../../models/gasto';
import { Usuario } from '../../../usuario/models/usuario';
import { UsuarioService } from '../../../usuario/services/usuario.service';
@Component({
  selector: 'app-gasto-list',
  templateUrl: './gasto-list.component.html',
  styleUrls: ['./gasto-list.component.css']
})
export class GastoListComponent {
  gastos: Gasto[] = [];
  totalGastos: number = 0;
  saldoActual: number = 0; // Para almacenar el saldo actual del usuario

  constructor(private gastoService: GastoService, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.gastos = this.gastoService.getGastos();
    this.calcularTotalGastos();
    this.obtenerSaldoUsuario(); // Obtener el saldo actual del usuario
  }

  calcularTotalGastos(): void {
    this.totalGastos = this.gastos.reduce((total, gasto) => total + gasto.monto, 0);
  }

  obtenerSaldoUsuario(): void {
    const usuario: Usuario | null = this.usuarioService.getUsuario(); // Obtener el usuario actual
    if (usuario) {
      this.saldoActual = usuario.saldoActual; // Asignar el saldo actual
    }
  }

  eliminarGasto(id: number): void {
    this.gastoService.eliminarGasto(id);
    this.gastos = this.gastoService.getGastos();
    this.calcularTotalGastos();
  }
}