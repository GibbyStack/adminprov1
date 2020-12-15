import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
@Component({
  selector: 'app-headbar',
  templateUrl: './headbar.component.html',
  styles: [
  ]
})
export class HeadbarComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) {}

  usuario: Usuario = null;

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
    } else {
      return false;
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
