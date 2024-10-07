// meta-ahorro-dashboard.component.ts
import { Component } from '@angular/core';
import { MetaAhorro } from '../../models/meta-ahorros';
import { MetaAhorroService } from '../../services/meta-ahorros.service';

@Component({
    selector: 'app-meta-ahorros-dashboard',
    templateUrl: './meta-ahorros-dashboard.component.html',
    styleUrls: ['./meta-ahorros-dashboard.component.css']
})
export class MetaAhorrosDashboardComponent {
    metas: MetaAhorro[] = [];

    constructor(private metaService: MetaAhorroService) {
        this.metas = this.metaService.obtenerMetas();
    }

    eliminarMeta(id: number | undefined): void {
        if (id !== undefined) {
            this.metaService.eliminarMeta(id);
            this.metas = this.metaService.obtenerMetas();
        }
    }

    actualizarProgreso(meta: MetaAhorro): void {
        meta.progreso = (meta.montoAhorrado / meta.montoObjetivo) * 100;
    
        if (meta.progreso >= 100) {
            meta.progreso = 100;
            meta.estado = 'Alcanzada';
        } else if (new Date() > new Date(meta.fechaLimite)) {
            meta.estado = 'Fallida';
        } else {
            meta.estado = 'En progreso';
        }
 
        this.metaService.actualizarMeta(meta);
    }
    
    
}
