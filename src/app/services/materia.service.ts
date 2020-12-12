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
        return this.http.get(`${base_url}/materias`);
    }

    getSingleMateria(id) {
        return this.http.get(`${base_url}/materias/${id}`);
    }

    updateMateria(id, formData: MateriaForm) {
        return this.http.put(`${base_url}/materias/${id}`, formData);
    }

    addMateria(formData: MateriaForm) {
        return this.http.post(`${base_url}/materias`, formData);
    }

    deleteMateria(id) {
        return this.http.delete(`${base_url}/materias/${id}`);
    }
}