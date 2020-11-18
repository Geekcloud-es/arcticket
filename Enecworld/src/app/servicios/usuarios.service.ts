import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag'
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  query= gql`search{
    
  }`;
  constructor(private apollo: Apollo) { }

  getUserName(codigo: String){
     
  }
}
