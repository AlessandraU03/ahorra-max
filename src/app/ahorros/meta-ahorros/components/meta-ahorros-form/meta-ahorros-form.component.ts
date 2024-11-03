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
        nombreMeta: '', 
        montoObjetivo: 0, 
        fechaLimite: new Date(), 
        montoAhorrado: 0,
        progreso: 0, 
        estado: 'En progreso' 
    };

    constructor(private metaService: MetaAhorroService) {}

    agregarMeta(): void {
        if (!this.meta.nombreMeta) {
            Swal.fire({
                title: 'Error',
                text: 'El nombre de la meta es obligatorio.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }
        if (this.meta.montoObjetivo <= 0) {
            Swal.fire({
                title: 'Error',
                text: 'El monto objetivo debe ser mayor a cero.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }
        if (new Date(this.meta.fechaLimite) <= new Date()) {
            Swal.fire({
                title: 'Error',
                text: 'La fecha límite debe ser una fecha futura.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        this.meta.id = Date.now();
  
        this.metaService.crearMeta(this.meta);
        
        Swal.fire({
            title: '¡Éxito!',
            text: 'La meta ha sido registrada correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });

        this.resetForm();
    }

    private resetForm(): void {
        this.meta = { 
            id: 0,
            nombreMeta: '', 
            montoObjetivo: 0, 
            fechaLimite: new Date(), 
            montoAhorrado: 0,
            progreso: 0, 
            estado: 'En progreso' 
        };
    }
}
