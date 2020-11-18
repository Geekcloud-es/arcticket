import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {ClientesService} from '../../servicios/clientes.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material';

//NEW 
import { NewAvisoComponent } from '../../shared/Avisos/dialog/new-aviso/new-aviso.component';
import { NewParteComponent } from '../dialog/new-parte/new-parte.component';

//CLOSE
import { CerrarAvisoComponent } from '../dialog/cerrar-aviso/cerrar-aviso.component'; 
import { CerrarParteComponent } from '../dialog/cerrar-parte/cerrar-parte.component';


//EDIT 
import { ModificarAvisoComponent } from '../dialog/modificar-aviso/modificar-aviso.component';

import { FormControl } from '@angular/forms';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { searchValues } from '../common/interfaces';



@Component({
  selector: 'app-tecnico',
  templateUrl: './tecnico.component.html',
  styleUrls: ['./tecnico.component.css']
})
export class TecnicoComponent implements OnInit {
  
  myControl = new FormControl();
  options: any;
  filteredOptions: Observable<string[]>;
  
  public advSearch: searchValues =  new searchValues();
  busqueda: string;
  
  private querySubscription: Subscription;

  avisos:any ;
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
            estado
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

  constructor(private apollo: Apollo, private _CL: ClientesService, private dialog: MatDialog) {

    this.avisosSync();
    this.apollo.query<any>({
      query: gql`query {
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
          map(value => this._filter(value, this.options))
        );
    })

  }
  ngOnInit(){

    
  }


  avisosSync(){

    this.querySubscription =  this.apollo.watchQuery<any>({ 
     query: this.avisoQ,
     variables: { avisosArr : this.advSearch.response.arrAvisos},
     pollInterval: 1000
    })
    .valueChanges
    .subscribe(async data => {
        this.avisos = data.data.allFullAvisos;

        this.avisos = await Promise.all(this.avisos.map(async aviso => {
          var cli = aviso.aviso.cliente;

          var cliente: any = await this._CL.searchBycod(cli);
          aviso.aviso.cliente = [cli, cliente.data.cliente[0].nombre]
          return aviso;
        }));

      })
  }



  getDateH(value){
    let d: Date = new Date(value);
    return d.getDay()+'/'+d.getDate()+'/'+d.getFullYear();
  }

  
  private _filter(value: string, arr: any): string[] {
    const filterValue = value.toLowerCase();

    return arr.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

  search(){
   
    if(this.advSearch.search.aviso != undefined){
        this.advSearch.response.arrAvisos = [this.advSearch.search.aviso];
        console.log(this.advSearch);
    } else {
      let fechaA = this.advSearch.search.fechaA != undefined ? this.advSearch.search.fechaA.toISOString() : undefined;
      let fechaC = this.advSearch.search.fechaC != undefined ? this.advSearch.search.fechaC.toISOString() : undefined;
      this.apollo.query<any>({
        query: gql`
            query searchAdv($cliente: String, $fechaA: Date, $fechaC: Date ,$estado: String, $spec: String){
                advSearchAvisos(cliente: $cliente,fechaA: $fechaA, fechaC: $fechaC,  specwords: $spec, estado: $estado)
            }`,
        variables: {
          cliente: this.advSearch.search.cliente,
          fechaA: fechaA,
          fechaC: fechaC,
          estado: this.advSearch.search.estado,
          spec: this.advSearch.search.specwords,
         }})
         .subscribe(data => {
            this.advSearch.response.arrAvisos = data.data.advSearchAvisos;
            console.log(this.advSearch);
           });


        }
      }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    this.dialog.open(NewAvisoComponent, dialogConfig);

  }
  }
