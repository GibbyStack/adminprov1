import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { AlumnoForm } from '../interfaces/alumno-form.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  constructor (private http: HttpClient) {}

  getAllAlumnos() {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/alumnos`, {headers: {'x-token': token}});
  }

  getSingleAlumno(id) {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/alumnos/${id}`, {headers: {'x-token': token}});
  }

  updateAlumno(id, formData: AlumnoForm) {
    const token = localStorage.getItem('token') || '';
    return this.http.put(`${base_url}/alumnos/${id}`, formData, {headers: {'x-token': token}});
  }

  addAlumno(formData: AlumnoForm) {
    const token = localStorage.getItem('token') || '';
    return this.http.post(`${base_url}/alumnos`, formData, {headers: {'x-token': token}});
  }

  deleteAlumno(id){
    const token = localStorage.getItem('token') || '';
    return this.http.delete(`${base_url}/alumnos/${id}`, {headers: {'x-token': token}});
  }

}
