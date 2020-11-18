import { Component, OnInit, OnChanges, SimpleChange, ElementRef, ViewChild } from '@angular/core';
import { AppVarsService } from '../../Servicios/app-vars.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Aviso } from '../../common/interfaces';
import { MatStepper } from '@angular/material/stepper';
@Component({
  selector: 'app-new-aviso',
  templateUrl: './new-aviso.component.html',
  styleUrls: ['./new-aviso.component.css']
})
export class NewAvisoComponent implements OnInit {
  

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

  contratosList: String[];
  
  formulario: Aviso = new Aviso();

  @ViewChild('techieInput', { static: false }) techieInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  myControl = new FormControl();
  options: any = [];
  filteredOptions: Observable<string[]>;
  
 

  tiposAviso: any;
  constructor(public _vars: AppVarsService, private apollo: Apollo, private dialogRef: MatDialogRef<NewAvisoComponent>) { 

    

    
    // Load Clientes
    this.apollo.query<any>({
      query:gql`query {
        clientesSearch(all: "S") {
          codigo,
          nombre
        }
      }`
    }).subscribe(data => {
      this.options = data.data.clientesSearch;

      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value,this.options))
        );
    })
    this.tiposAviso = this._vars.getTiposDeAvisos();

    //Load Tecnicos
    this.apollo.query<any>({
      query:gql`{
      getUser(tp: "T"){
        usuario,
        nombre
      }}
      `
    }).subscribe(data => {
      this.alltechies = data.data.getUser.map(tecnico  => {
        return {
          nombre: tecnico.nombre,
          codigo : tecnico.usuario
        }
      });
      console.log(this.techies);
      this.filteredtechies = this.techieCtrl.valueChanges.pipe(
        startWith(null),
        map((techie: string | null) => techie ? this._filter(techie,this.techies) : this.alltechies.slice()));

    }
    )

    //loadContratos
    this.apollo.query<any>({
      query: gql`query contratosSearch($cliente: String){
        contratos(busqueda: $cliente){
          ... on mantenimiento{
            tipo
          },
          ... on bhoras{
            tipo
          }
        }
      }`,
      variables: {}
    }).subscribe(data => {
        this.contratosList = data.data.contratos.map(element => element.tipo)
    })
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
    
   if( !(this.codtechies.includes(event.option.value))) {
     this.techies.push(event.option.viewValue);
     this.codtechies.push(event.option.value);
   }
    
    this.techieInput.nativeElement.value = '';
    this.techieCtrl.setValue(null);
  }
  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  contratos(cliente){
    this.apollo.query<any>({
      query: gql`query contratosSearch($cliente: String){
        contratos(busqueda: $cliente){
          ... on mantenimiento{
            tipo
          },
          ... on bhoras{
            tipo
          }
        }
      }`,
      variables: {cliente: cliente}
    })
    .subscribe(data => {
      
       this.contratosList = data.data.contratos.map(element => element.tipo);
       console.log(this.contratosList)
    })
  }

  send(){
    this.formulario.tecnico = this.codtechies;
    console.log(this.formulario);

    this.apollo.mutate<any>({
      mutation: gql`
      mutation newAviso($Aviso: avisosInput){
        newAviso(Aviso:$Aviso){
          aviso
        }
      }`,
      variables: { Aviso: this.formulario }
    }).subscribe(data => {
      alert("listo");
    })
    this.dialogRef.close();
  }
}
