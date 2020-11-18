import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvisosRoutingModule } from './avisos-routing.module';
import { TecnicoComponent } from './tecnico/tecnico.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Material Angular Imports
import { MatCardModule, MatDialogModule, MatDialogRef } from '@angular/material';
import { MatExpansionModule } from '@angular/material';
import { MatDividerModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatChipsModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatStepperModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSliderModule } from '@angular/material';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';

//Ng Charts Import
import { ChartsModule } from 'ng2-charts';
import { DashboardComponent } from './tecnico/dashboard/dashboard.component';
import { StadisticsComponent } from './tecnico/stadistics/stadistics.component';


import { SharedModule } from '../shared/shared.module';
/*
import { NewAvisoComponent } from './dialog/new-aviso/new-aviso.component';
import { NewParteComponent } from './dialog/new-parte/new-parte.component';*/
import { AvisosAbiertosComponent } from './tecnico/dashboard/avisos/avisos-abiertos/avisos-abiertos.component';
import { AvisosCerradosComponent } from './tecnico/dashboard/avisos/avisos-cerrados/avisos-cerrados.component';
import { PartesAbiertosComponent } from './tecnico/dashboard/avisos/partes-abiertos/partes-abiertos.component';
import { SinCerrarComponent } from './tecnico/dashboard/notificaciones/sin-cerrar/sin-cerrar.component';
import { PorAtenderComponent } from './tecnico/dashboard/notificaciones/por-atender/por-atender.component';
/*import { CerrarAvisoComponent } from './dialog/cerrar-aviso/cerrar-aviso.component';
import { CerrarParteComponent } from './dialog/cerrar-parte/cerrar-parte.component';
import { ModificarParteComponent } from './dialog/modificar-parte/modificar-parte.component';
import { ModificarAvisoComponent } from './dialog/modificar-aviso/modificar-aviso.component';*/


@NgModule({
  declarations: [TecnicoComponent, DashboardComponent, StadisticsComponent, AvisosAbiertosComponent, AvisosCerradosComponent, PartesAbiertosComponent, SinCerrarComponent, PorAtenderComponent],
  imports: [
    CommonModule,
    AvisosRoutingModule,
    MatCardModule,
    MatExpansionModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatChipsModule,
    ChartsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatSelectModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatMenuModule,
    SharedModule
  ],
  providers: [MatDatepickerModule] ,
  entryComponents: []
})
export class AvisosModule { }
