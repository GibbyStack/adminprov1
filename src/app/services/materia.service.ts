import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { MateriaForm } from '../interfaces/materia-form.interface';

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})
export class MateriaService {
    constructor(private http: HttpClient) {}

    getAllMaterias() {
      const token = localStorage.getItem('token') || '';
      return this.http.get(`${base_url}/materias`, {headers: {'x-token': token}});
    }

    getSingleMateria(id) {
      const token = localStorage.getItem('token') || '';
      return this.http.get(`${base_url}/materias/${id}`, {headers: {'x-token': token}});
    }

    updateMateria(id, formData: MateriaForm) {
      const token = localStorage.getItem('token') || '';
      return this.http.put(`${base_url}/materias/${id}`, formData, {headers: {'x-token': token}});
    }

    addMateria(formData: MateriaForm) {
      const token = localStorage.getItem('token') || '';
      return this.http.post(`${base_url}/materias`, formData, {headers: {'x-token': token}});
    }

    deleteMateria(id) {
      const token = localStorage.getItem('token') || '';
      return this.http.delete(`${base_url}/materias/${id}`, {headers: {'x-token': token}});
    }
}
