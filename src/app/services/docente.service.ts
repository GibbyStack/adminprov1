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
        return this.http.get(`${base_url}/docentes`);
    }

    getSingleDocente(id) {
        return this.http.get(`${base_url}/docentes/${id}`);
    }

    updateDocente(id, formData: DocenteForm) {
        return this.http.put(`${base_url}/docentes/${id}`, formData);
    }

    addDocente(formData: DocenteForm) {
        return this.http.post(`${base_url}/docentes`, formData);
    }

    deleteDocente(id) {
        return this.http.delete(`${base_url}/docentes/${id}`);
    }
}