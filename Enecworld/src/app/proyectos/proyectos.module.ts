import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProyectosRoutingModule } from './proyectos-routing.module';
import { ProyectosComponent } from './proyectos.component';
import { MatCardModule } from '@angular/material'; 

@NgModule({
  declarations: [ProyectosComponent],
  imports: [
    CommonModule,
    ProyectosRoutingModule, 
    MatCardModule
  ]
})
export class ProyectosModule { }
