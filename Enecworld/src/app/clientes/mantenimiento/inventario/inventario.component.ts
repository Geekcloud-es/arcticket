import { Component, OnInit, Input } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
export interface Inventario {
  tipo: String, 
  descripcion: String, 
  serie: String
}


@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  @Input() dataSource;
  displayedColumns: string[] = ['tipo', 'descripcion', 'serie'];
 
  constructor() { 
   
  }

  ngOnInit() {
  }

}
