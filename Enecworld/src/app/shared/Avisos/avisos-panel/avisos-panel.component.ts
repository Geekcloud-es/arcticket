import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChange } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ClientesService } from '../../../servicios/clientes.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material';

import { TiempoService } from '../../../servicios/tiempo.service';

import { FormControl } from '@angular/forms';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { NewAvisoComponent } from '../../Avisos/dialog/new-aviso/new-aviso.component';
import { NewParteComponent } from '../../Avisos/dialog/new-parte/new-parte.component';
import { CerrarAvisoComponent } from '../../Avisos/dialog/cerrar-aviso/cerrar-aviso.component';
import { CerrarParteComponent } from '../../Avisos/dialog/cerrar-parte/cerrar-parte.component';
import { ModificarParteComponent } from '../../Avisos/dialog/modificar-parte/modificar-parte.component';
import { ModificarAvisoComponent } from '../../Avisos/dialog/modificar-aviso/modificar-aviso.component';

import { BodyComponent } from '../../../reports/body/body.component';

@Component({
  selector: 'app-avisos-panel',
  templateUrl: './avisos-panel.component.html',
  styleUrls: ['./avisos-panel.component.css']
})
export class AvisosPanelComponent implements OnInit {
  
  private querySubscription: Subscription;
 @Input() arrAvisos: Number[]  ;
  avisos: any;
  
  avisoQ = gql`

      query search($avisosArr: [Int]){
      	allFullAvisos(avisosArr: $avisosArr){
          aviso{
            aviso,
            cliente,
            descripcion,
            prioridad,
            desplazamiento,
            tp,
            f_apertura,
            f_cierre,
            estado,
            contrato
          },
          parte{
            aviso,
            parte,
            descripcion,
            reparacion,
            tecnico,
            horas,
            estado,
            f_apertura,
            f_cierre,
            desplazamiento{
              km, 
              dietas
            },
            prestamo{
              componente,
              cantidad
            }
            componentes{
              componente,
              cantidad
            }
          }
        }
      }
  `;
  
  constructor(private apollo: Apollo, private _CL: ClientesService,private dialog: MatDialog, public _TS: TiempoService) { 
    this.avisosSync();
  }
    
  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChange){
    
    this.querySubscription.unsubscribe();
    this.avisosSync();
  }
  avisosSync() {

    this.querySubscription = this.apollo.watchQuery<any>({
      query: this.avisoQ,
      variables: { avisosArr: this.arrAvisos },
      pollInterval: 1000
    })
      .valueChanges
      .subscribe(async data => {
        console.log(data)
        this.avisos = data.data.allFullAvisos;
        
        
        this.avisos = await Promise.all(this.avisos.map(async aviso => {
          var cli = aviso.aviso.cliente;

          var cliente: any = await this._CL.searchBycod(cli);
          aviso.aviso.cliente = [cli, cliente.data.cliente[0].nombre]

          return aviso;
        }));

      })
  }
  
  partesAbiertos(partes: any){
        
    return (partes.find(element => element.estado === "A")) ;
  }

  modificar(aviso) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      aviso: aviso
    };
    this.dialog.open(ModificarAvisoComponent, dialogConfig);
  }
  newParte(aviso) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      aviso: aviso
    };
    this.dialog.open(NewParteComponent, dialogConfig);
  }

  
  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    this.dialog.open(NewAvisoComponent, dialogConfig);

  }

  closeParte(n_parte: String) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      parte: n_parte
    };
    this.dialog.open(CerrarParteComponent, dialogConfig);



  }

  closeAviso(n_aviso: String) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      aviso: n_aviso
    };
    this.dialog.open(CerrarAvisoComponent, dialogConfig);

  };

  getDateH(value){
    let d: Date = new Date(value);
    return d.getDay()+'/'+d.getDate()+'/'+d.getFullYear();
  }

  print(i: any){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = i;
    this.dialog.open(BodyComponent, dialogConfig);
  }
}
