import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDividerModule } from '@angular/material';

import { ReportsRoutingModule } from './reports-routing.module';
import { BodyComponent } from './body/body.component';

import { PipesSharedModule } from '../pipes-shared/pipes-shared.module';

@NgModule({
  declarations: [BodyComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    MatDividerModule,
    PipesSharedModule
  ],
  exports:[BodyComponent]
})
export class ReportsModule { }
