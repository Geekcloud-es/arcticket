import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import * as moment from '../../../../node_modules/moment/moment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscribable, Subscription } from 'rxjs';

import { AddBonoHorasComponent } from './add-bono-horas/add-bono-horas.component';
@Component({
  selector: 'app-bono-horas',
  templateUrl: './bono-horas.component.html',
  styleUrls: ['./bono-horas.component.css']
})
export class BonoHorasComponent implements OnInit {
  private querySubscription: Subscription
  @Input() bhoras: Number;
  public bonos: any;
  public arrAvisos: Number[] = [];
  public progreso: Number;
  query = gql`
  query searchBH($codigo: Int){
      bhoras: contratos(codigo: $codigo){
        ... on bhoras{
          cliente,
          horas_m,
          record{
            fecha,
            bono{
              codigo,
              nombre,
              cantidad
            }
            representantes,
            horas_r
        }
      }
    },
    horasAvisos: horasAvisos(contrato: $codigo)
  }`;
  
  
  constructor(private apollo: Apollo, public dialog: MatDialog) {
    
   }

  ngOnInit() {
    console.log(this.bhoras)
    this.sync()
  }

  ngOnChanges(){
    this.querySubscription.unsubscribe();
    this.sync()
  }
  
  sync(){
    this.querySubscription = this.apollo.watchQuery<any>({
      query: this.query,
      variables: { codigo: this.bhoras },
      pollInterval: 1000
    })
      .valueChanges
      .subscribe(data => {
        console.log(data)
        this.bonos = data.data.bhoras[0];
        this.progreso = (data.data.horasAvisos * 100 )/this.bonos.record.slice().reverse()[0].horas_r ;

        let cliente = data.data.bhoras[0].cliente;

        this.apollo.query<any>({
          query: gql`
          query find($c: String){
            advSearchAvisos(cliente: $c, contrato:"bhoras")
          }
        `,
          variables: { c: cliente }

        })
          .subscribe(data => {
            console.log(cliente)
            this.arrAvisos = data.data.advSearchAvisos;

          });

      })
  }
  getDate(v){
    return moment(v).format("MMM Do YY");
  }
  
  addBono(){
    this.dialog.open(AddBonoHorasComponent, {data : {contrato: this.bhoras}})
  }
  

}
