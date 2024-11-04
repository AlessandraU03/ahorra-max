import { Component, OnInit } from '@angular/core';
import { GastoService } from '../../services/gasto.service';
import { Gasto } from '../../models/gasto';
import { Usuario } from '../../../usuario/models/usuario';
import { UsuarioService } from '../../../usuario/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gasto-list',
  templateUrl: './gasto-list.component.html',
  styleUrls: ['./gasto-list.component.css']
})
export class GastoListComponent implements OnInit {
  gastos: Gasto[] = [];
  totalGastos: number = 0;
  saldoActual: number = 0; 

  constructor(private gastoService: GastoService, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarGastos();
    this.obtenerSaldoUsuario();
  }

  cargarGastos(): void {
    this.gastoService.listargastos().subscribe({
      next: (gastos: Gasto[]) => {
        this.gastos = gastos;
        this.calcularTotalGastos();
      },
      error: (error) => {
        console.error('Error al cargar los gastos:', error);
      }
    });
  }

  calcularTotalGastos(): void {
    this.totalGastos = this.gastos.reduce((total, gasto) => total + gasto.monto, 0);
  }

  obtenerSaldoUsuario(): void {
    const usuarioId = 11; 
    this.usuarioService.leerUsuario(usuarioId).subscribe({
      next: (usuario: Usuario) => {
        this.saldoActual = usuario.saldoActual; 
      },
      error: (error) => {
        console.error('Error al obtener el usuario:', error);
      }
    });
  }

  eliminarGasto(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.gastoService.eliminargasto(id).subscribe({
          next: () => {
            this.cargarGastos(); 
            Swal.fire('Eliminado!', 'El gasto ha sido eliminado.', 'success');
          },
          error: (error) => {
            console.error('Error al eliminar el gasto:', error);
            Swal.fire('Error', 'No se pudo eliminar el gasto.', 'error');
          }
        });
      }
    });
  }
}
