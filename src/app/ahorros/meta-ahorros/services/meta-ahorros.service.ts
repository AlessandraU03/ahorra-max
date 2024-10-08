// meta-ahorro.service.ts
import { Injectable } from '@angular/core';
import { MetaAhorro } from '../models/meta-ahorros';

@Injectable({
  providedIn: 'root'
})
export class MetaAhorroService {
    private metas: MetaAhorro[] = [];

    constructor() {
        this.cargarMetas(); // Carga las metas del localStorage al inicializar
    }

    agregarMeta(meta: MetaAhorro): void {
        this.metas.push(meta);
        this.guardarMetas();
    }

    obtenerMetas(): MetaAhorro[] {
        return this.metas;
    }

    eliminarMeta(id: number): void {
        this.metas = this.metas.filter(meta => meta.id !== id);
        this.guardarMetas();
    }

    private guardarMetas(): void {
        localStorage.setItem('metas', JSON.stringify(this.metas));
    }

    private cargarMetas(): void {
        const metasJson = localStorage.getItem('metas');
        if (metasJson) {
            this.metas = JSON.parse(metasJson);
        }
    }

    actualizarProgreso(meta: MetaAhorro): void {
        meta.progreso = (meta.montoAhorrado / meta.montoObjetivo) * 100;
        if (meta.progreso >= 100) {
            meta.progreso = 100;
            meta.estado = 'Alcanzada';
        }
        this.guardarMetas();
    }

actualizarMeta(meta: MetaAhorro): void {
    const index = this.metas.findIndex(m => m.id === meta.id);
    if (index > -1) {
        this.metas[index] = meta;
        this.guardarMetas();
    }
}

    
    
    
}
