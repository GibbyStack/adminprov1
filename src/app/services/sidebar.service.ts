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
      {titulo: 'Students', url: 'alumnos'},
      {titulo: 'Teachers', url: 'docentes'},
      {titulo: 'Subject ', url: 'materias'}
    ]
  }
];

  constructor() { }
}
