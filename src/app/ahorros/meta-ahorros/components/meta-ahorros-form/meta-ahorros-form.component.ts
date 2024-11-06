import { Component } from '@angular/core';
import { MetaAhorro } from '../../models/meta-ahorros';
import { MetaAhorroService } from '../../services/meta-ahorros.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-meta-ahorros-form',
    templateUrl: './meta-ahorros-form.component.html',
    styleUrls: ['./meta-ahorros-form.component.css']
})
export class MetaAhorrosFormComponent {
    meta: MetaAhorro = { 
        id: 0,
        nombre_meta: '', 
        monto_objetivo: 0, 
        fecha_limite: new Date(), // Fecha por defecto
        monto_ahorrado: 0,
        progreso: 0,
        estado: 'En progreso' 
    };

    constructor(private metaService: MetaAhorroService) {}

    agregarMeta(): void {
        if (!this.meta.nombre_meta) {

            Swal.fire({
                title: 'Error',
                text: 'El nombre de la meta es obligatorio.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }
        if (this.meta.monto_objetivo <= 0) {
            Swal.fire({
                title: 'Error',
                text: 'El monto objetivo debe ser mayor a cero.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        if (new Date(this.meta.fecha_limite) <= new Date()) {

            Swal.fire({
                title: 'Error',
                text: 'La fecha límite debe ser una fecha futura.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        this.calcularProgreso();
        this.metaService.crearMeta(this.meta).subscribe({
            next: (data) => {
                Swal.fire({
                    title: '¡Éxito!',
                    text: 'La meta ha sido registrada correctamente.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
                this.resetForm();  
            },
            error: (error) => {
                console.error('Error al crear la meta:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un error al registrar la meta.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        });
    }

    calcularProgreso(): void {
        if (this.meta.monto_ahorrado > this.meta.monto_objetivo) {
            this.meta.monto_ahorrado = this.meta.monto_objetivo; 
        }
        this.meta.progreso = (this.meta.monto_ahorrado / this.meta.monto_objetivo) * 100;

        if (this.meta.progreso >= 100) {
            this.meta.estado = 'Alcanzada';
        } else if (new Date(this.meta.fecha_limite) < new Date()) {
            this.meta.estado = 'Fallida';
        } else {
            this.meta.estado = 'En progreso';
        }

    }

    private resetForm(): void {
        this.meta = { 
            id: 0,
            nombre_meta: '', 
            monto_objetivo: 0, 
            fecha_limite: new Date(),
            monto_ahorrado: 0,
            progreso: 0,
            estado: 'En progreso'
        };
    }
}
