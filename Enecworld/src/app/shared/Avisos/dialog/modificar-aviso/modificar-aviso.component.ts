import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AppVarsService } from '../../servicios/app-vars.service';
import { map, startWith } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import gql from 'graphql-tag';
import {FormControl} from '@angular/forms';
import {Aviso} from '../../common/interfaces'
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-modificar-aviso',
  templateUrl: './modificar-aviso.component.html',
  styleUrls: ['./modificar-aviso.component.css']
})
export class ModificarAvisoComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  techieCtrl = new FormControl();
  filteredtechies: Observable<string[]>;
  techies: any = [];
  alltechies: any = [];
  codtechies: any = [];

  

  @ViewChild('techieInput', { static: false }) techieInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  description: Aviso;
  dateA:any;
  dateC: any;
  tiposAviso: any;
  constructor(
    private apollo: Apollo,
    private dialogRef: MatDialogRef<ModificarAvisoComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    public _vars: AppVarsService
  ) {
     
    this.description = data.aviso;
    this.dateA = new FormControl(new Date(this.description.f_apertura));
    this.dateC = new FormControl(new Date(this.description.f_cierre));
    this.tiposAviso = this._vars.getTiposDeAvisos();
    //Load Tecnicos
    this.apollo.query<any>({
      query: gql`{
      getUser(tp: "T"){
        usuario,
        nombre
      }}
      `
    }).subscribe(data => {
      this.alltechies = data.data.getUser.map(tecnico => {
        return {
          nombre: tecnico.nombre,
          codigo: tecnico.usuario
        }
      });
      console.log(this.techies);
      this.filteredtechies = this.techieCtrl.valueChanges.pipe(
        startWith(null),
        map((techie: string | null) => techie ? this._filter(techie, this.techies) : this.alltechies.slice()));

    });

    
  }

  ngOnInit() {
  }

  private _filter(value: string, arr: any): string[] {
    const filterValue = value.toLowerCase();

    return arr.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }
  
  remove(techie: string): void {
    const index = this.techies.indexOf(techie);

    if (index >= 0) {
      this.techies.splice(index, 1);
      this.codtechies.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {

    if (!(this.codtechies.includes(event.option.value))) {
      this.techies.push(event.option.viewValue);
      this.codtechies.push(event.option.value);
    }

    this.techieInput.nativeElement.value = '';
    this.techieCtrl.setValue(null);
  }
  
  modify(){
  
  this.description.cliente = this.description.cliente[0];
  console.log(this.description)
  this.apollo.mutate({
      mutation: gql`
         mutation update($formulario1: avisosModify){
           updateAvisos(formulario: $formulario1)
         }
      `,
      variables: { formulario1 : this.description }
    })
    .subscribe(data => {
      console.log(data)
    });
    this.dialogRef.close();
  }
}
