import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


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
      password: ['', Validators.required],
      password2: ['', Validators.required],
      picture: [, Validators.requiredTrue],
    },
    {
      validators: this.passwordsIguales('password', 'password2'),
    }
  );

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.initForm(this.usuario);
  }

  initForm(usuario: Usuario) {
    this.myprofileForm = this.formBuilder.group(
      {
        nombre: [usuario.nombre, Validators.required],
        email: [usuario.email, [Validators.required, Validators.email]],
        password: ['', Validators.required],
        password2: ['', Validators.required],
        picture: [usuario.picture, Validators.requiredTrue],
      },
      {
        validators: this.passwordsIguales('password', 'password2'),
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

  contrasenasNoValidas() {
    const pass1 = this.myprofileForm.get('password').value;
    const pass2 = this.myprofileForm.get('password2').value;
    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);
      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    };
  }
}
