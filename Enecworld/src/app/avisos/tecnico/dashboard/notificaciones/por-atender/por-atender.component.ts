import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ClientesService } from '../../../../../servicios/clientes.service';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewAvisoComponent } from '../../../../dialog/new-aviso/new-aviso.component';

@Component({
  selector: 'app-por-atender',
  templateUrl: './por-atender.component.html',
  styleUrls: ['./por-atender.component.css']
})
export class PorAtenderComponent implements OnInit {
  public avisos = [];
  private query = gql`
    query {
     searchAvisos(situacion: "Por_atender"){
      aviso,
      cliente,
      descripcion,
      f_apertura
      }
  }`;

  d: Date = new Date();
  constructor(private apollo: Apollo, private dialog: MatDialog) {
    this.d.setDate(this.d.getDate() - 2);
    this.apollo.query<any>({
      query: this.query
    }).subscribe(data => {
      this.avisos = data.data.searchAvisos

    })
   }

  ngOnInit() {
  }

  openModAvisos() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    this.dialog.open(NewAvisoComponent, dialogConfig);
  }

}
