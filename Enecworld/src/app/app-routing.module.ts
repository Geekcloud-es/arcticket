import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:"avisos",
    loadChildren : './avisos/avisos.module#AvisosModule'
  },
  {
    path:"clientes",
    loadChildren : './clientes/clientes.module#ClientesModule'
  },
  {
    path: "reports",
    loadChildren: './reports/reports.module#ReportsModule'
  }, 
  {
    path: "proyectos", 
    loadChildren: './proyectos/proyectos.module#ProyectosModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
