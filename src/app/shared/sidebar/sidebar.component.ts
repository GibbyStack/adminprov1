import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SidebarService } from '../../services/sidebar.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  usuario: Usuario = null;

  constructor(private sidebarService: SidebarService, private usuarioService: UsuarioService ) {
    this.menuItems = sidebarService.menu;
  }

  ngOnInit(): void {
    this.usuarioService.getSingleUsuario(localStorage.getItem('id')).subscribe(
      (resp: any) => {
        if (resp.status) {
          this.usuario = resp.data;
        }
      }
    )
  }

  comprobarUsuario(){
    if (this.usuario != null) {
      return true;
    }
  }

  comprobarImg(){
    if (this.comprobarUsuario()){
      if (this.usuario.picture != null){
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  borrarStorage(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  }
}
