import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetaAhorrosDashboardComponent } from './components/meta-ahorros-dashboard/meta-ahorros-dashboard.component';
import { MetaAhorrosFormComponent } from './components/meta-ahorros-form/meta-ahorros-form.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MetaAhorrosDashboardComponent,
    MetaAhorrosFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [MetaAhorrosDashboardComponent, MetaAhorrosFormComponent]
})
export class MetaAhorrosModule { }
