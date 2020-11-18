import { Component, OnInit, Input } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  @Input() contacto: any;
  
  

  constructor() { 
   
  }

  ngOnInit() {
  }
  
  

}
