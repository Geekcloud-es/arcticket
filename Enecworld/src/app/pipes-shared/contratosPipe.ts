import { Pipe , PipeTransform } from '@angular/core';

@Pipe({
    name: "contratosPipe"
})

export class ContratosPipe implements PipeTransform {
    transform(codigo: String){
        switch(codigo) {
            case 'mantenimiento': {
                return 'Mantenimeinto'
            }
            case 'bhoras':{
                return 'Bono de Horas'
            }
        }
    }
}