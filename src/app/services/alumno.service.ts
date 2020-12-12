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
    return this.http.get(`${base_url}/alumnos`);
  }

  getSingleAlumno(id) {
    return this.http.get(`${base_url}/alumnos/${id}`);
  }

  updateAlumno(id, formData: AlumnoForm) {
    return this.http.put(`${base_url}/alumnos/${id}`, formData);
  }

  addAlumno(formData: AlumnoForm) {
    return this.http.post(`${base_url}/alumnos`, formData);
  }

  deleteAlumno(id){
    return this.http.delete(`${base_url}/alumnos/${id}`);
  }

}
