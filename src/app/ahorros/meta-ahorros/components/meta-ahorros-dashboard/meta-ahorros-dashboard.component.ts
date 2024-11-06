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
        this.calcularProgresoYEstado();  // Calcular el progreso y el estado después de cargar las metas
      },
      error: (error) => {
        console.error('Error al listar metas:', error);
      }
    });
  }

  // Calcular progreso y estado de cada meta
  calcularProgresoYEstado(): void {
    this.metas.forEach(meta => {
      // Calcular progreso
      meta.progreso = (meta.monto_ahorrado / meta.monto_objetivo) * 100;
      if (meta.progreso > 100) meta.progreso = 100; // Limitar el progreso a un máximo de 100%

      // Calcular estado
      if (meta.progreso >= 100) {
        meta.estado = 'Alcanzada';
      } else if (new Date() > new Date(meta.fecha_limite)) {
        meta.estado = 'Fallida';
      } else {
        meta.estado = 'En progreso';
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
              this.cargarMetas(); 
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
    if (meta.monto_ahorrado < 0 || meta.monto_ahorrado > meta.monto_objetivo) {
      Swal.fire({
        title: 'Error',
        text: 'El monto ahorrado debe ser un valor entre 0 y el monto objetivo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return; 
    }
    meta.progreso = (meta.monto_ahorrado / meta.monto_objetivo) * 100;
    if (meta.progreso > 100) meta.progreso = 100;

    if (meta.progreso >= 100) {
      meta.estado = 'Alcanzada';
    } else if (new Date() > new Date(meta.fecha_limite)) {
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
