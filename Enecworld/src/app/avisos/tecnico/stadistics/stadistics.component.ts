import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

import { AppVarsService } from '../../../servicios/app-vars.service';

@Component({
  selector: 'app-stadistics',
  templateUrl: './stadistics.component.html',
  styleUrls: ['./stadistics.component.css']
})
export class StadisticsComponent implements OnInit {
  // Bar Charts Vars
  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      xAxes: [{
        stacked: true
      }],
      yAxes: [{
        stacked: true
      }]
    }
  };
  public barChartLabels: String[];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [];


  //Pie Charts Varsa
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: String[];
  public pieChartData: number[] = [15,23,54];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;

  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  constructor(private apollo: Apollo, private _vars: AppVarsService) {
    this.apollo.watchQuery<any>(
      {query : gql`{
        getUser(tp:"T"){
          usuario,
          nombre,
          apellido
        }
      }`,
      pollInterval: 1000
      
    }
    )
    .valueChanges
    .subscribe(data => {
      var usuario = data.data
      var tecnicosCod = []
      this.barChartLabels = usuario.getUser.map(data => {
        tecnicosCod.push(data.usuario);
        return data.nombre+" "+data.apellido
        
      }); 
      var tipo = this._vars.getTiposDeAvisos();
      this.pieChartLabels = tipo
      console.log(tecnicosCod);
      this.apollo.watchQuery<any>({
        query: gql`query barchart($tecnico: [String], $tipo: [String]){
          getHoras(tecnico: $tecnico, tipo: $tipo){
            data,
            label
          }
        }`,
        variables: { tecnico: tecnicosCod, tipo: tipo },
        pollInterval: 1000
      })
      .valueChanges
      .subscribe(data => {
        
        this.barChartData = data.data.getHoras
      })
    })
  }


    

  ngOnInit() {}
}