import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [{
    titulo: 'Principal',
    icono: 'mdi mdi-gauge',
    submenu: [
      {titulo: 'Main', url: '/'},
      {titulo: 'ProgressBar', url: 'progress'},
      {titulo: 'Alumnos', url: 'alumnos'},
      {titulo: 'Docentes', url: 'docentes'},
      {titulo: 'Materias', url: 'materias'}
    ]
  }
];

  constructor() { }
}
