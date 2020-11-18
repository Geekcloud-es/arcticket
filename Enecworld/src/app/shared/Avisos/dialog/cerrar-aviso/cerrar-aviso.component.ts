import { Component, OnInit, Inject, ElementRef, ViewChild, ɵConsole } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-cerrar-aviso',
  templateUrl: './cerrar-aviso.component.html',
  styleUrls: ['./cerrar-aviso.component.css']
})
export class CerrarAvisoComponent implements OnInit {


  description: any;
  fecha_cierre: Date;
  constructor(
    private apollo: Apollo,
    private dialogRef: MatDialogRef<CerrarAvisoComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.description = data;
  }

  ngOnInit() {
  }

  cerrar(){
    console.log(this.fecha_cierre.toISOString());
    var aviso = this.description.aviso;
    this.apollo.mutate({
      mutation: gql`
       mutation cerrar($av: Int, $f_cierre: String){
          closeAviso(cod: $av, f_cierre: $f_cierre){
            estado
          }
        }
      `,
      variables: { "av": aviso , "f_cierre": this.fecha_cierre.toISOString()}
    }).subscribe(data => {
      console.log(data)
    });

    this.dialogRef.close();
  }

}
