import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TecnicoComponent } from './tecnico/tecnico.component';
const routes: Routes = [
  {
    path: '',
    component: TecnicoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvisosRoutingModule { }
