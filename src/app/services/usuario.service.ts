import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment.prod';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap, map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { RenewPasswordForm } from '../interfaces/renewpassword-form.interface';
import { ProfileForm } from '../interfaces/profile-form.interface';
import { MyprofileForm } from '../interfaces/myprofile-form.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  getSingleUsuario(id) {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/usuarios/${id}`, {headers: {'x-token': token}});
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData);
  }

  updateUsuario(formData: MyprofileForm) {
    const token = localStorage.getItem('token') || '';
    return this.http.put(`${base_url}/usuarios`, formData,  {headers: {'x-token': token}});
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.data);
      })
    );
  }

  loginGoogle(token) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.data);
      })
    )
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      },
    }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.data);
      }),
      map((resp) => {
        if (resp.data)
          return true;
        else
            return false
      }),
      catchError((error) => of(false))
    );
  }

  renewPassword(formData: RenewPasswordForm) {
    return this.http.put(`${base_url}/usuarios/changepassword`, formData);
  }
}
