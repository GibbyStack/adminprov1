import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-renewpassword',
  templateUrl: './renewpassword.component.html',
  styleUrls: ['./renewpassword.component.css']
})
export class RenewpasswordComponent {

  public formSubmitted = false;

  public renewpasswordForm = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password2: ['', Validators.required],
    }
  )

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService, private router: Router) { }

  changePassword() {
    this.formSubmitted = true;
    if (this.renewpasswordForm.valid) {
      this.usuarioService.renewPassword(this.renewpasswordForm.value).subscribe(
        (resp: any) => {
          if (resp.status) {
            Swal.fire({
              title: 'Exito!',
              text: resp.message,
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigateByUrl('/login');
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
  campoNoValido(campo: string): boolean {
    if (this.renewpasswordForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  contrasenasNoValidas() {
    const pass1 = this.renewpasswordForm.get('password').value;
    const pass2 = this.renewpasswordForm.get('password2').value;
    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  passwordIguales(pass1Name: string, pass2Name: string) {
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
