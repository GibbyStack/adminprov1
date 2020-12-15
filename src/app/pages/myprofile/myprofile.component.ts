import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styles: [
  ]
})
export class MyprofileComponent implements OnInit {

  usuario: Usuario;
  public formSubmitted = false;
  public myprofileForm = this.formBuilder.group(
    {
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      picture: [''],
    }
  );

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.usuarioService.getSingleUsuario(localStorage.getItem('id')).subscribe(
      (resp: any) => {
        if (resp.status) {
          this.usuario = resp.data;
          this.initForm(this.usuario);
        }
      }
    )
  }

  actualizarUsuario(){
    this.formSubmitted = true;
    if (this.myprofileForm.valid) {
      this.usuarioService.updateUsuario(this.myprofileForm.value).subscribe(
        (resp: any) => {
          if (resp.status) {
            Swal.fire({
              title: 'Success!',
              text: resp.message,
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigateByUrl('/dashboard/myprofile');
              }
            });
          } else {
            Swal.fire({
              title: 'Error!',
              text: resp.message,
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        },
        (err) => console.warn(err)
      );
    } else {
      console.log('formulario no valido');
    }
  }

  initForm(usuario: Usuario) {
    this.myprofileForm = this.formBuilder.group(
      {
        nombre: [usuario.nombre, Validators.required],
        email: [usuario.email, [Validators.required, Validators.email]],
        picture: [usuario.picture],
      }
    )
  }

  campoNoValido(campo: string): boolean {
    if (this.myprofileForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
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




}
