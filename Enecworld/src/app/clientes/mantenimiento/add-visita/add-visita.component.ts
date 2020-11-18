import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
@Component({
  selector: 'app-add-visita',
  templateUrl: './add-visita.component.html',
  styleUrls: ['./add-visita.component.css']
})
export class AddVisitaComponent implements OnInit {
   
  form: FormGroup
  formText: FormGroup;
  contrato: any;
  public revision = {
    fecha: Date,
    observaciones: String,
    tecnico: String
  }
  public visitas: any;
  private query = gql`
   mutation nuevaVisita($record: recordVisitasInput, $contrato: Int) {
      addVisita(record: $record, contrato: $contrato)
    }
  `
  constructor(public dialogRef: MatDialogRef<AddVisitaComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private apollo: Apollo, private formBuilder: FormBuilder) {
    this.contrato = data;
   
    this.formText = this.formBuilder.group({
        fecha: new FormControl(),
        observaciones: new FormControl
      });
    
    this.form = this.formBuilder.group({
    parametros: new FormArray([])
      });
      console.log(this.form);
      this.addCheckboxes();
     }

  ngOnInit() {
  }

  private addCheckboxes() {
    this.contrato.parametro.map((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.form.controls.parametros as FormArray).push(control);
    });
  }

  send(){
    let dataSend = {
      tecnico: "enec"
    };
    const selectedOrderIds = this.form.value.parametros
      .map((v, i) => {
        return {
          x: this.contrato.parametro[i],
          y: v
        }
      });
    
    let formulario = this.formText.value;
    formulario.fecha = new Date(formulario.fecha);
    Object.assign(dataSend, {parametros:selectedOrderIds} );
    Object.assign(dataSend, formulario);
    console.log(dataSend);

    this.apollo.mutate({
        mutation: this.query,
        variables: {
          record: dataSend,
          contrato: this.contrato.contrato}
      }).subscribe(data => {
        console.log(data);
      })

   this.dialogRef.close()
  }

}
