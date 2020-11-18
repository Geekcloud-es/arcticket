import { Component, OnInit, Input, Injectable, ModuleWithComponentFactories, OnChanges, SimpleChange } from '@angular/core';
import { mantenimiento } from '../common/interfaces';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { ClientesService } from '../../servicios/clientes.service';
import  * as moment from '../../../../node_modules/moment/moment';
import { numeral } from 'numeral'; 
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { runInThisContext } from 'vm';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddVisitaComponent} from "./add-visita/add-visita.component";
import { AvisosPanelComponent } from '../../avisos/common/avisos-panel/avisos-panel.component';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})

export class MantenimientoComponent implements OnInit {
  @Input() codigo: any;
  public arrAvisos: Number[] = [] ;
  private querySubscription: Subscription;
  private parametros: String[];
  public mantenimiento: mantenimiento = new mantenimiento();
  public progreso: Number;
  public visitas: any;
  public inventario: any;
  avisos = {
    totales:50,
    abiertos:6,
    avg:0
  }

  queryMantenimiento = gql`query search($codigo:Int){
    contratos(codigo:$codigo){
    	... on mantenimiento{
        contrato
      	cliente,
        f_inicio,
        f_cierre,
        representante,
        inventario{
          tipo,
          descripcion,
          n_serie
        }
        visitas{
          parametros,
          record{
            fecha,
            tecnico,
            observaciones,
            parametros{
              x,
              y
            }
          }
        }
      }
    }
  }`;

  constructor(private apollo: Apollo, private _CL: ClientesService, public dialog: MatDialog) { 
    
  }

  ngOnInit() {

    
    
    this.sync();
  }

  ngOnChanges(changes: SimpleChange) {
    this.querySubscription.unsubscribe();
    this.sync()
  }

  sync(){
   this.querySubscription = this.apollo.watchQuery<any>({
      query: this.queryMantenimiento,
      variables: { codigo: this.codigo },
      pollInterval: 1000
    })
    .valueChanges
    .subscribe(data => {
      console.log(data);

      let resume = data.data.contratos;
      this.mantenimiento.f_inicio = moment(resume[0].f_inicio)
      this.mantenimiento.f_fin = moment(resume[0].f_cierre)

      this.visitas = data.data.contratos[0].visitas.record;
      this.parametros = data.data.contratos[0].visitas.parametros
      console.log(this.parametros)


      this.progreso = (1 - ((this.mantenimiento.f_fin.diff(moment(), 'days', true)) / 365)) * 100


      //this.progreso = (moment().diff(moment(this.mantenimiento.f_inicio), 'months', true)/(moment(this.mantenimiento.f_fin).diff(moment(this.mantenimiento.f_inicio), 'months', true)))*100


      this.avisos.avg = (this.avisos.totales + this.avisos.abiertos) / moment().diff(this.mantenimiento.f_inicio, 'months', true)
      this.avisos.avg = parseInt(String(this.avisos.avg))

      this.inventario = data.data.contratos[0].inventario
      
      let cliente = data.data.contratos[0].cliente;
      
      this.apollo.query<any>({
        query: gql`
          query find($c: String){
            advSearchAvisos(cliente: $c, contrato: "mantenimiento")
          }
        `,
        variables: { c: cliente }

      })
        .subscribe(data => {
          console.log(cliente)
          this.arrAvisos = data.data.advSearchAvisos;
          
        });
    
    });


  }

  addVisitas(){
    this.dialog.open(AddVisitaComponent,{width: '30rem', data:{contrato:this.codigo, parametro: this.parametros}});
  }

  getDateProgress(v){
    return moment(v).format("MMM Do YY");
  }


}
