import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GastoDashboardComponent } from './components/gasto-dashboard/gasto-dashboard.component';
import { GastoFormComponent } from './components/gasto-form/gasto-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GastoDashboardComponent,
    GastoFormComponent
  ],
  imports: [
    CommonModule,  FormsModule
  ],
  exports: [GastoDashboardComponent, GastoFormComponent]
})
export class GastoModule { }
