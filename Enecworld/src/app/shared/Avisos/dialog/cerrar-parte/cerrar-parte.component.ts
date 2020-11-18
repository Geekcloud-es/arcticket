import { Component, OnInit, Inject, ElementRef, ViewChild, ɵConsole } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { desplazamiento } from '../../common/interfaces';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-cerrar-parte',
  templateUrl: './cerrar-parte.component.html',
  styleUrls: ['./cerrar-parte.component.css']
})
export class CerrarParteComponent implements OnInit {
  description: any;
  desplazamientoOBJ: desplazamiento = new desplazamiento();
  f_cierre : Date;
  constructor(
    private apollo: Apollo,
    private dialogRef: MatDialogRef<CerrarParteComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) { 
    this.description = data;
  }

  ngOnInit() {
  }
  
  cerrar(){
    
    var parte = this.description.parte;
    console.log(this.f_cierre.toISOString())
    this.apollo.mutate({
      mutation: gql`
        mutation cerrar($parte: Int, $f_cierre: String, $desplazamiento: desplazamientoInput){
          closeParte(parte: $parte, f_cierre: $f_cierre , desplazamiento: $desplazamiento){
            parte
          }
        }
      `,
      variables: { "parte": parte, "f_cierre": this.f_cierre.toISOString(), "desplazamiento": this.desplazamientoOBJ}
    }).subscribe(data   => {
      console.log(this.desplazamientoOBJ)
      this.dialogRef.close();
    });
  }

}
