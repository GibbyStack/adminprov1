import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { DataService } from '../../services/data.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;
  public auth2;

  public loginForm = this.formBuilder.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', Validators.required],
    remember: [false],
  });

  constructor(private router: Router, private formBuilder: FormBuilder, private usuarioService: UsuarioService, private dataService: DataService) { }

  ngOnInit(): void {
    this.renderButton();
  }

  login() {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      this.usuarioService.login(this.loginForm.value).subscribe((resp: any) => {
        if (resp.status) {
          if (this.loginForm.get('remember').value) {
            localStorage.setItem('email', this.loginForm.get('email').value);
          } else {
            localStorage.removeItem('email');
          }
          Swal.fire({
            title: 'Exito!',
            text: resp.message,
            icon: 'success',
            confirmButtonText: 'Ok',
          }).then((result) => {
            if (result.isConfirmed) {
              this.dataService.email = this.loginForm.get('email').value;
              this.router.navigateByUrl('/');
            }
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: resp.message,
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      });
    } else {
      console.log('formulario no valido');
    }
  }

  campoNoValido(campo: string): boolean {
    if (this.loginForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark'
    });
    this.startApp();
  }

  startApp() {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '461138166765-ehfpapoo76qhln05m4ernrjd5vqkc6r8.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
          const id_token = googleUser.getAuthResponse().id_token;
          this.usuarioService.loginGoogle(id_token).subscribe((resp) => {
            if (resp.status) {
              let profile = googleUser.getBasicProfile();
              this.dataService.email = profile.getEmail();
              this.router.navigateByUrl('/');
            } else {
            }
          });
        },
        (error) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
