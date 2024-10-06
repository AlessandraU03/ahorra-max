// ahorros.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AhorrosComponent } from './ahorros.component';
import { UsuarioModule } from './usuario/usuario.module';
import { GastoModule } from './gasto/gasto.module';
import { MetaAhorrosModule } from './meta-ahorros/meta-ahorros.module';

@NgModule({
  declarations: [AhorrosComponent],
  imports: [
    CommonModule,
    UsuarioModule,
    GastoModule,
    MetaAhorrosModule
  ],
  exports: [AhorrosComponent] // Exporta el componente para que otros módulos puedan usarlo
})
export class AhorrosModule {}
