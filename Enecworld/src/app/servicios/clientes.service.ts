import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { resolve } from 'q';
@Injectable({
  providedIn: 'root'
})

export class ClientesService {

  clientes: any;

  constructor(private apollo: Apollo) { }

  async searchBycod(cod: String){
    this.clientes = null;
    var ret;
    var query = gql`
    query clientes($id: String){
      cliente: clientesSearch(codigo: $id){
        nombre,
        codigo,
      	telefono,
        sla
      }
    }
    `;

    var result = new Promise((resolve, reject) => {
      this.apollo.query({
        query: query,
        variables: { id: cod }
      }).subscribe(data => {
        this.clientes = data;
        console.log(data);
        resolve(data);
      })
    });

    return await result;
    
  }

  getCliente(){
    return this.clientes;
  }
}
