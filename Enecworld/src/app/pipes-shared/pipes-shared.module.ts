import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TecnicosPipe } from './tecnicosPipe';
import { ContratosPipe } from './contratosPipe';

@NgModule({
  declarations: [
    TecnicosPipe,
    ContratosPipe
  ],
  imports: [
    CommonModule,
    
  ],
  exports: [
    TecnicosPipe,
    ContratosPipe
  ]
})
export class PipesSharedModule { }
