import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppVarsService {
  private tiposDeAviso: String[]=[
    'Infraestructura',
    'Comunicaciones',
    'Sistemas',
    'Ciberseguridad',
    'Hepldesk'
  ];
  constructor() { }

  getTiposDeAvisos() {
    return this.tiposDeAviso;
  }
}
