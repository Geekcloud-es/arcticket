import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


//Material Import
import { MatCardModule,
        MatTabsModule,
        MatProgressBarModule,
        MatDividerModule, 
        MatListModule,
        MatExpansionModule,
        MatChipsModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule, 
        MatCheckboxModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule, 
        MatStepperModule,
        MatSelectModule, 
        MatRippleModule

      } from '@angular/material';




import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes/clientes.component';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { BonoHorasComponent } from './bono-horas/bono-horas.component';
import { InventarioComponent } from './mantenimiento/inventario/inventario.component';
import { VisitasComponent } from './mantenimiento/visitas/visitas.component';
import { AddVisitaComponent } from './mantenimiento/add-visita/add-visita.component';
import { DatosClientesComponent } from './datos-clientes/datos-clientes.component';
import { ContactoComponent } from './datos-clientes/contacto/contacto.component';

import { SharedModule } from '../shared/shared.module';
import { ContratosComponent } from './contratos/contratos.component';
import { AddBonoHorasComponent } from './bono-horas/add-bono-horas/add-bono-horas.component';

@NgModule({
  declarations: [
    ClientesComponent, 
    MantenimientoComponent, 
    BonoHorasComponent, 
    InventarioComponent, 
    VisitasComponent, 
    AddVisitaComponent, 
    DatosClientesComponent, 
    ContactoComponent, 
      AddVisitaComponent, ContratosComponent, AddBonoHorasComponent],

  imports: [
    CommonModule,
    ClientesRoutingModule,
    MatCardModule,
    MatTabsModule,
    MatProgressBarModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatChipsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatSelectModule, 
    SharedModule,
    FormsModule,
    MatRippleModule
  ] ,
  providers: [MatDatepickerModule],
  exports : [
    MatProgressBarModule
  ],
  entryComponents: [AddVisitaComponent, AddBonoHorasComponent]
})
export class ClientesModule { }
