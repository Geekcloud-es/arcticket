import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Parte } from '../../common/interfaces';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag'


@Component({
  selector: 'app-new-parte',
  templateUrl: './new-parte.component.html',
  styleUrls: ['./new-parte.component.css']
})
export class NewParteComponent implements OnInit {
    

  //Tecnicos seleccion (Variables)
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

  //Tecnicos Seleccion END

  description: any
  Parte: Parte = new Parte();
  constructor(
    private apollo :Apollo,
    private dialogRef: MatDialogRef<NewParteComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.description = data;
    this.Parte.aviso = data.aviso;

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
      console.log(this.alltechies);
      this.filteredtechies = this.techieCtrl.valueChanges.pipe(
        startWith(null),
        map((techie: string | null) => techie ? this._filter(techie, this.techies) : this.alltechies.slice()));

    }
    
    )

    }

  ngOnInit() {
  }

  //Seleccion de tenicos Funciones
  

  remove(techie: string): void {
    const index = this.techies.indexOf(techie);

    if (index >= 0) {
      this.techies.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.codtechies.push(event.option.value);
    this.techies.push(event.option.viewValue);
    this.techieInput.nativeElement.value = '';
    this.techieCtrl.setValue(null);
  }

  private _filter(value: string, arr: any): string[] {
    const filterValue = value.toLowerCase();

    return arr.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

  //Seleccion de tecnicos END

  send(){
    this.Parte.tecnico = this.codtechies;
    console.log(this.Parte);
    this.apollo.mutate({
      mutation : gql`
        mutation new($parte: parteInput2){
            newParte(Parte: $parte){
              parte
            }
        }
      `,
      variables: { "parte" : this.Parte }
    }).subscribe(data => {})
  }
}
