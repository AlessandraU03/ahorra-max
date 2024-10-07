// meta-ahorros.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetaAhorrosComponent } from './meta-ahorros.component';
import { MetaAhorrosFormComponent } from './components/meta-ahorros-form/meta-ahorros-form.component';
import { MetaAhorrosDashboardComponent } from './components/meta-ahorros-dashboard/meta-ahorros-dashboard.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MetaAhorrosComponent,         
    MetaAhorrosFormComponent,
    MetaAhorrosDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    MetaAhorrosComponent      
  ]
})
export class MetaAhorrosModule { }
