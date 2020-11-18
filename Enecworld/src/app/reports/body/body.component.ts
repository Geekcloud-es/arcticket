import { Component, OnInit, Inject, ElementRef, ViewChild, ɵConsole } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as jsPDF from 'jspdf';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

var html2canvas = require('../../../../node_modules/html2canvas');
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  
  @ViewChild('pdf', {static: false}) pdf: ElementRef;
  description: any;
  cliente: any
  desplazamiento = {
    km: 0,
    dietas: 0
  };
  totalHoras: Number;
  private clienteQuery = gql`
     query cliente($cliente: String){
        clientesSearch(codigo: $cliente){
          telefono,
        }
      }
  `;
  
  constructor( private apollo: Apollo, private dialogRef: MatDialogRef<BodyComponent>, @Inject(MAT_DIALOG_DATA) data) {
    //Desciption to DATA 
    this.description = data;
    console.log(this.description);
    //Cliente Info
    this.apollo.query<any>({
      query: this.clienteQuery,
      variables: { cliente: this.description.aviso.cliente[0]}
    }).subscribe( d => {
      this.cliente = d.data.clientesSearch[0]
      console.log(this.cliente)
    } )
    //Desplazamiento 
    var partes = this.description.parte;
    this.totalHoras = partes.map(element => element.horas*element.tecnico.length).reduce((a,b) => a+b);
    console.log(this.totalHoras);
    this.desplazamiento.km = partes.map(element => element.desplazamiento.km).reduce( (a,b) => a+b );
    
    this.desplazamiento.dietas = partes.map(element => element.desplazamiento.dietas).reduce((a, b) => a + b);

    
    

    
    

  }

  ngOnInit() {
    
  }
  
  public toPdf(){
    
    html2canvas(this.pdf.nativeElement, {
      allowTaint: true,
      useCORS: true,
      logging: false,
      height: window.outerHeight + window.innerHeight,
      windowHeight: window.outerHeight + window.innerHeight, 
    }).then( canvas => {
     
      var imgWidth = 310;
      var pageHeight = 239;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      var doc = new jsPDF('p','mm','a4');
      var img = canvas.toDataURL('image/png');
      
      var position = 0;  
      
      doc.addImage( img , 'PNG', -50, position, imgWidth, imgHeight)

      doc.save('test.pdf');
    });
    // doc.save('test.pdf');//fails to add image to pdf
    // doc.save('test.pdf');//fails to add image to pdf
  }
}
