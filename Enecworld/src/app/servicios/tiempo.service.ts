import { Injectable } from '@angular/core';
import * as moment from 'moment/moment';
@Injectable({
  providedIn: 'root'
})
export class TiempoService {

  constructor() { }

  getDateFormat(v){
    return moment(v).format("MMM Do YY");
  }
}
