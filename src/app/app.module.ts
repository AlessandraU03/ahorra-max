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
    AhorrosModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
