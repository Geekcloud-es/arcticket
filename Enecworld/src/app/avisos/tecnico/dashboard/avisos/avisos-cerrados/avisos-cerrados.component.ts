import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-avisos-cerrados',
  templateUrl: './avisos-cerrados.component.html',
  styleUrls: ['./avisos-cerrados.component.css']
})
export class AvisosCerradosComponent implements OnInit {
  public total: any = 0;
  public crecicmiento: any;
  public lineChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Avisos Cerrados' }
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    legend: {
        display: false
    },
    
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
     xAxes: [{
            display:false
        }],
        yAxes: [{
            display:false
        }]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(41, 128, 185,0.1)',
      borderColor: 'rgba(41, 128, 185,1)',
      pointBackgroundColor: 'rgba(41, 128, 185,1.0)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(41, 128, 185,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private apollo: Apollo) { 

    var query = gql`{
      monthlyAvisos {
    	  id: _id{ 
      	month
      }
  		count
      }
    }`;

    this.apollo.watchQuery<any>({
      query: query,
     
    })
    .valueChanges
    .subscribe(data => {
      var dt = new Date();
      this.lineChartLabels = this.lineChartLabels.filter(  (x,i) => {
        if (i <= dt.getMonth()){
          return x
        }
      });
      let index: any;
      let dataSt : Number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
      data.data.monthlyAvisos.forEach(element => {
        console.log(element)
        index = element.id.month - 1
        console.log(index)
        this.lineChartData[0].data[index] = element.count;
        dataSt[index] = element.count
        this.total = this.total + element.count;

        });
        let ult = Number(dataSt[index]);
        let pUlt = Number(dataSt[index]);

        this.crecicmiento = dataSt[index-1] != 0 ? ((ult)/pUlt*100) : ult*100
     })
  }

  ngOnInit() {
  }

}
