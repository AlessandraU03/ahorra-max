// ahorros.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AhorrosComponent } from './ahorros.component';
import { UsuarioModule } from './usuario/usuario.module';
import { GastoModule } from './gasto/gasto.module';
import { MetaAhorrosModule } from './meta-ahorros/meta-ahorros.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [AhorrosComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    UsuarioModule,
    GastoModule,
    MetaAhorrosModule
  ],
  exports: [AhorrosComponent]
})
export class AhorrosModule {}
