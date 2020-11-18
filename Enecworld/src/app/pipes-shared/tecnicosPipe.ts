import { Pipe, PipeTransform } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Pipe({
    name: "TecnicosPipe"
})

export class TecnicosPipe implements PipeTransform {
    query = gql `
        query tecnico($cod: String){
            getUser(codigo: $cod){
                nombre, 
                apellido
            }
        }
    `;
    constructor(private apollo: Apollo){

    }
    async transform(codigo: String) {
        var ret = "";
        await new Promise( resolve => {this.apollo.query<any>({
                query: this.query,
                variables:{ cod: codigo }
            })
            .subscribe( data => {
                    var tecnico = data.data.getUser[0]
                    console.log(tecnico)
                    ret = tecnico.nombre+" "+tecnico.apellido;
                    resolve(ret)
            })
            })
        console.log(ret)
        return ret
    }
}