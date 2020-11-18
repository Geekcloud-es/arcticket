import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { TiempoService } from '../../servicios/tiempo.service';
import { Observable } from 'apollo-link';

@Component({
  selector: 'app-datos-clientes',
  templateUrl: './datos-clientes.component.html',
  styleUrls: ['./datos-clientes.component.css']
})
export class DatosClientesComponent implements OnInit {
  @Input() codigoCliente: String;
  public Contactos: any;
  public clientes: any;
  private query = gql`
    query clientes($cliente: String){
      clientesSearch(codigo:$cliente){
        nombre,
        f_alta,
        telefono,
      }
    }
  `;

  private queryContactos = gql`
    query contactosSearch($busqueda: String,$empresa: String){
      contactos(busqueda: $busqueda, empresa: $empresa){
        nombre, 
        correo,
        departamento, 
        cargo, 
        telefono
      }
    }
  `;

  

  public cliente:any; 
  constructor(private apollo: Apollo, public _TP: TiempoService) {

  }

  ngOnInit() {
 
    
  }

  ngOnChanges(changes: SimpleChange){
    console.log(this.codigoCliente);
    this.apollo.query<any>({
      query: this.query,
      variables: { cliente: this.codigoCliente }
    }).subscribe(data => {
      //console.log(data)
      this.cliente = data.data.clientesSearch[0]
    })

    this.apollo.query<any>({
      query: this.queryContactos,
      variables: { empresa: this.codigoCliente }
    }).subscribe(data => {
      console.log(data)
      this.Contactos = data.data.contactos;
    })
  }
}
