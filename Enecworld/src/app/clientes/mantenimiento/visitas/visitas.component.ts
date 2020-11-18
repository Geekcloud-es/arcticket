import { Component, OnInit, Input, Pipe , PipeTransform } from '@angular/core';
import { visitAstChildren } from '@angular/compiler';
import * as moment from '../../../../../node_modules/moment/moment';



@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.component.html',
  styleUrls: ['./visitas.component.css']
})
export class VisitasComponent implements OnInit {
  
  @Input() visitas: any;
  constructor() {
    
   }

  ngOnInit() {
    
  }
  
  public monthsAgo(v: any){
    return moment(v).fromNow()
  }
}
