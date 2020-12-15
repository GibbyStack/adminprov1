import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { DocenteForm } from '../interfaces/docente-form.interface';

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})
export class DocenteService {
    constructor (private http: HttpClient) {}

    getAllDocente() {
      const token = localStorage.getItem('token') || '';
      return this.http.get(`${base_url}/docentes`, {headers: {'x-token': token}});
    }

    getSingleDocente(id) {
      const token = localStorage.getItem('token') || '';
      return this.http.get(`${base_url}/docentes/${id}`, {headers: {'x-token': token}});
    }

    updateDocente(id, formData: DocenteForm) {
      const token = localStorage.getItem('token') || '';
      return this.http.put(`${base_url}/docentes/${id}`, formData, {headers: {'x-token': token}});
    }

    addDocente(formData: DocenteForm) {
      const token = localStorage.getItem('token') || '';
      return this.http.post(`${base_url}/docentes`, formData, {headers: {'x-token': token}});
    }

    deleteDocente(id) {
      const token = localStorage.getItem('token') || '';
      return this.http.delete(`${base_url}/docentes/${id}`, {headers: {'x-token': token}});
    }
}
