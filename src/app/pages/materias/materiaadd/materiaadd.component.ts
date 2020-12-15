import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MateriaService } from '../../../services/materia.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-materiaadd',
  templateUrl: './materiaadd.component.html',
  styles: [
  ]
})
export class MateriaaddComponent implements OnInit {

  private token: string;
  public formSubmitted = false;

  public materiaaddForm = this.formBuilder.group(
    {
      nombre: ['', Validators.required],
      horas: ['', Validators.required],
      creditos: ['', Validators.required]
    }
  )

  constructor(private formBuilder: FormBuilder, private matariaService: MateriaService, private router: Router) { }

  ngOnInit(): void {
    this.token = this.getToken();
  }

  getToken(){
    return localStorage.getItem('token');
  }

  campoNoValido(campo: string): boolean {
    if (this.materiaaddForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  crearMateria() {
    this.formSubmitted = true;
    if (this.materiaaddForm.valid) {
      this.matariaService.addMateria(this.materiaaddForm.value).subscribe(
        (resp: any) => {
          if (resp.status) {
            Swal.fire({
              title: 'Success!',
                text: resp.message,
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigateByUrl('/dashboard/materias')
              }
            });
          } else {
            Swal.fire({
              title: 'Error!',
              text: resp.message,
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        },
        (err) => console.warn(err)
      );
    } else {
      console.log('formulario no valido');
    }
  }
}
