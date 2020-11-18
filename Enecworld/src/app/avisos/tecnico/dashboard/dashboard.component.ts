import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { AvisosAbiertosComponent } from './avisos/avisos-abiertos/avisos-abiertos.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  dashboard: any = {
    avisos: {}
  }

  constructor(private apollo : Apollo) { 
    this.apollo.watchQuery({
      query: gql`{
        abiertos: stadAvisos(estado: "A"),
	      cerrados: stadAvisos(estado: "C"),
      }`,
      pollInterval: 1000
    })
      .valueChanges
      .subscribe(data => {
        console.log(data);
        this.dashboard.avisos = data.data;
      })
  }

  ngOnInit() {
  }

}
