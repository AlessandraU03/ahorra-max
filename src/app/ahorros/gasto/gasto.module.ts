import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GastoComponent } from './gasto.component';
import { GastoFormComponent } from './components/gasto-form/gasto-form.component';
import { GastoListComponent } from './components/gasto-list/gasto-list.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    GastoComponent,
    GastoFormComponent,
    GastoListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

  ],
  exports: [
    GastoComponent
  ]
})
export class GastoModule { }
