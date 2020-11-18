import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { Apollo  } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-avisos-abiertos',
  templateUrl: './avisos-abiertos.component.html',
  styleUrls: ['./avisos-abiertos.component.css']
})
export class AvisosAbiertosComponent implements OnInit {
  
  // Doughnut
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: MultiDataSet = [
    [],
  ];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutColor = [{
    backgroundColor: [
      'rgba(110, 114, 20, 1)',
      'rgba(118, 183, 172, 1)',
      'rgba(0, 148, 97, 1)',
      'rgba(129, 78, 40, 1)',
      'rgba(129, 199, 111, 1)'
    ]
  }]
  constructor(private apollo: Apollo) {
    var query = gql`{
      clientesAvisos{
        clientes: _id
        count
      }
    }`;

    this.apollo.watchQuery<any>({
      query: query,
      pollInterval: 1000
    })
    .valueChanges
    .subscribe(data =>{
      data.data.clientesAvisos.forEach(element => {
        console.log(element);
        this.doughnutChartLabels.push(element.clientes);
        this.doughnutChartData[0].push(element.count);
      });
    })
   }

  ngOnInit() {
  }

}
