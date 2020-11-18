import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag'; 
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clienteSeleccionado: any;
  public busqueda: String = "";
  public resultado: any[];
  querySearch = gql`
    query buqueda($input: String){
        clientesSearch(input: $input){
          nombre, 
          codigo
        }
    }
  `;
  constructor(private apollo: Apollo) {
      this.search();
   }
  
  ngOnInit() {
  }
  
  assign(v){
    this.clienteSeleccionado = v;
  }

  search(){
    
    console.log(this.busqueda)
    this.apollo.query<any>({
      query: this.querySearch,
      variables: {input: this.busqueda}
    }).subscribe(data => {
      console.log(data)
      this.resultado = data.data.clientesSearch;
    })
  }
}
