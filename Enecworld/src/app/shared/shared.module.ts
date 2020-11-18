import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

//Material Import
import {
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
  MatStepperModule,
  MatSelectModule, 
  MatAutocompleteModule, 
  MatSliderModule, 
  MatSlideToggleModule

} from '@angular/material';

import { AvisosPanelComponent } from './Avisos/avisos-panel/avisos-panel.component';
import { NewAvisoComponent } from './Avisos/dialog/new-aviso/new-aviso.component';
import { NewParteComponent } from './Avisos/dialog/new-parte/new-parte.component';
import { CerrarAvisoComponent } from './Avisos/dialog/cerrar-aviso/cerrar-aviso.component';
import { CerrarParteComponent } from './Avisos/dialog/cerrar-parte/cerrar-parte.component';
import { ModificarParteComponent } from './Avisos/dialog/modificar-parte/modificar-parte.component';
import { ModificarAvisoComponent } from './Avisos/dialog/modificar-aviso/modificar-aviso.component';

import { ReportsModule } from '../reports/reports.module';
import { PipesSharedModule } from '../pipes-shared/pipes-shared.module';




@NgModule({
  declarations: [AvisosPanelComponent, NewAvisoComponent, NewParteComponent, CerrarAvisoComponent, CerrarParteComponent, ModificarAvisoComponent, ModificarParteComponent],
  imports: [
    CommonModule,
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
    MatStepperModule,
    MatSelectModule,
    FormsModule,
    MatAutocompleteModule, 
    MatSliderModule,
    MatSlideToggleModule, 
    ReactiveFormsModule,
    ReportsModule,
    PipesSharedModule
  ], 
  entryComponents: [AvisosPanelComponent, NewAvisoComponent, NewParteComponent, CerrarAvisoComponent, CerrarParteComponent, ModificarAvisoComponent, ModificarParteComponent],
  exports: [AvisosPanelComponent, NewAvisoComponent, NewParteComponent, CerrarAvisoComponent, CerrarParteComponent, ModificarAvisoComponent, ModificarParteComponent],
})
export class SharedModule { }
