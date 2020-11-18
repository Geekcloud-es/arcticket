import { Component, OnInit, inject  } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { ClientesService } from '../../../../../servicios/clientes.service';
import { NewAvisoComponent } from '../../../../dialog/new-aviso/new-aviso.component';


@Component({
  selector: 'app-sin-cerrar',
  templateUrl: './sin-cerrar.component.html',
  styleUrls: ['./sin-cerrar.component.css']
})
export class SinCerrarComponent implements OnInit {
  
  public avisos = [];
  private query = gql`
    query {
     searchAvisos(situacion: "Sin_cerrar"){
      aviso,
      cliente,
      descripcion,
      f_apertura
      }
  }`;

  d: Date = new Date();
  
  

  constructor(private apollo: Apollo) {
    this.d.setDate(this.d.getDate()-2);
    this.apollo.query<any>({
      query: this.query
    }).subscribe(data => {
      this.avisos = data.data.searchAvisos
    })
   }

  ngOnInit() {
  }
  
  

}

