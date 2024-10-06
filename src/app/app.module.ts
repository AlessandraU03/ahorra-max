// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AhorrosModule } from './ahorros/ahorros.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AhorrosModule, // Importar el módulo AhorrosModule en lugar del componente
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
