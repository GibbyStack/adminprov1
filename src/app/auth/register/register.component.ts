import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.formBuilder.group(
    {
      nombre: ['Gibby', Validators.required],
      email: ['gibby@rifa.com', [Validators.required, Validators.email]],
      password: ['1234', Validators.required],
      password2: ['1234', Validators.required],
      terminos: [false, Validators.requiredTrue],
    },
    {
      validators: this.passwordsIguales('password', 'password2'),
    }
  );

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService) {}

  crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      this.usuarioService.crearUsuario(this.registerForm.value).subscribe(
        (resp) => {
          Swal.fire({
            title: 'Exito!',
            text: 'Usuario registrado',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        },
        (err) => console.warn(err)
      );
    } else {
      console.log('formulario no valido');
    }
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;
    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos').value && this.formSubmitted;
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
