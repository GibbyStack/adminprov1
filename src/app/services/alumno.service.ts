import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { tap, map, catchError } from 'rxjs/operators';

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

}
