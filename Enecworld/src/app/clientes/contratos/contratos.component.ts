import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { getSupportedInputTypes } from '@angular/cdk/platform';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {
  @Input() clienteSeleccionado: any
  public contratosList: any;
  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.contratos()
  }

  ngOnChanges(changes: SimpleChanges){
    this.contratos()
  }
  
  contratos(){
    
      this.apollo.query<any>({
        query: gql`
          query contratos($cli: String){
            contratos(busqueda: $cli){
             ... on mantenimiento{
                contrato,
                tipo
              }
             ... on bhoras {
                contrato,
                tipo
              }
            }
          }
        `,
        variables: {cli:this.clienteSeleccionado.codigo}
      })
      .subscribe(data => {
        this.contratosList = data.data.contratos
        console.log(this.contratosList[0].contrato)
      })
  }

}
