import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styles: [
  ]
})
export class MyprofileComponent implements OnInit {

  usuario: Usuario;
  public profileForm = this.formBuilder.group(
    {
      email: [this.dataService.email || '', Validators.required]
    }
  )
  constructor(private dataService: DataService, private usuarioService: UsuarioService, private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.usuarioService.getSingleUsuario(this.profileForm.value).subscribe(
      (resp: any) => {
        if (resp.status) {
          this.usuario = resp.data;
        }
      }
    )
  }
}
