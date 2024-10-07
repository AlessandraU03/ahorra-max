// meta-ahorro-form.component.ts
import { Component } from '@angular/core';
import { MetaAhorro } from '../../models/meta-ahorros';
import { MetaAhorroService } from '../../services/meta-ahorros.service';

@Component({
    selector: 'app-meta-ahorros-form',
    templateUrl: './meta-ahorros-form.component.html',
    styleUrls: ['./meta-ahorros-form.component.css']
})
export class MetaAhorrosFormComponent {
    meta: MetaAhorro = { 
      id:0,
        nombreMeta: '', 
        montoObjetivo: 0, 
        fechaLimite: new Date(), 
        montoAhorrado: 0,
        progreso: 0, 
        estado: 'En progreso' 
    };

    constructor(private metaService: MetaAhorroService) {}

    agregarMeta(): void {
        this.meta.id = Date.now();
        this.metaService.actualizarProgreso(this.meta);
        this.metaService.agregarMeta(this.meta);
        this.resetForm();
    }
    
    

    private resetForm(): void {
        this.meta = { 
          id:0,
            nombreMeta: '', 
            montoObjetivo: 0, 
            fechaLimite: new Date(), 
            montoAhorrado: 0,
            progreso: 0, 
            estado: 'En progreso' 
        };
    }
}
