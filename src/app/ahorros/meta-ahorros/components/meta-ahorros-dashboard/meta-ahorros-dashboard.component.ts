import { Component, OnInit } from '@angular/core';
import { MetaAhorro } from '../../models/meta-ahorros';
import { MetaAhorroService } from '../../services/meta-ahorros.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-meta-ahorros-dashboard',
  templateUrl: './meta-ahorros-dashboard.component.html',
  styleUrls: ['./meta-ahorros-dashboard.component.css']
})
export class MetaAhorrosDashboardComponent implements OnInit {
  metas: MetaAhorro[] = [];

  constructor(private metaService: MetaAhorroService) {}

  ngOnInit(): void {
    this.cargarMetas();
  }

  cargarMetas(): void {
    this.metaService.listarMetas().subscribe({
      next: (metas: MetaAhorro[]) => {
        this.metas = metas;
      },
      error: (error) => {
        console.error('Error al listar metas:', error);
      }
    });
  }

  eliminarMeta(id: number | undefined): void {
    if (id !== undefined) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer. ¿Quieres continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.metaService.eliminarMeta(id).subscribe({
            next: () => {
              this.cargarMetas(); // Recarga la lista después de eliminar
              Swal.fire('Eliminado!', 'La meta ha sido eliminada.', 'success');
            },
            error: (error) => {
              console.error('Error al eliminar meta:', error);
              Swal.fire('Error', 'No se pudo eliminar la meta.', 'error');
            }
          });
        }
      });
    }
  }

  actualizarProgreso(meta: MetaAhorro): void {
    if (meta.montoAhorrado < 0 || meta.montoAhorrado > meta.montoObjetivo) {
      Swal.fire({
        title: 'Error',
        text: 'El monto ahorrado debe ser un valor entre 0 y el monto objetivo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return; 
    }

    meta.progreso = (meta.montoAhorrado / meta.montoObjetivo) * 100;

    if (meta.progreso >= 100) {
      meta.progreso = 100;
      meta.estado = 'Alcanzada';
    } else if (new Date() > new Date(meta.fechaLimite)) {
      meta.estado = 'Fallida';
    } else {
      meta.estado = 'En progreso';
    }

    this.metaService.actualizarMeta(meta.id, meta).subscribe({
      next: () => {
        Swal.fire({
          title: '¡Éxito!',
          text: 'El progreso ha sido actualizado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      },
      error: (error) => {
        console.error('Error al actualizar meta:', error);
        Swal.fire('Error', 'No se pudo actualizar la meta.', 'error');
      }
    });
  }
}
