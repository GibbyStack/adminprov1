import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlumnoService } from '../../../services/alumno.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnoadd',
  templateUrl: './alumnoadd.component.html',
  styles: [
  ]
})
export class AlumnoaddComponent implements OnInit {

  private token: string;
  public formSubmitted = false;

  public alumnoaddForm = this.formBuilder.group(
    {
      nombre: ['', Validators.required],
      edad: ['', Validators.required],
      sexo: ['', Validators.required],
      semestre: ['', Validators.required],
      carrera: ['', Validators.required],
    }
  )

  constructor(private formBuilder: FormBuilder, private alumnoService: AlumnoService, private router: Router) { }

  ngOnInit(): void {
    this.token = this.getToken();
  }

  getToken(){
    return localStorage.getItem('token');
  }

  campoNoValido(campo: string): boolean {
    if (this.alumnoaddForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  crearAlumno(){
    this.formSubmitted = true;
    if (this.alumnoaddForm.valid) {
      this.alumnoService.addAlumno(this.alumnoaddForm.value).subscribe(
        (resp: any) => {
          if (resp.status) {
            Swal.fire({
              title: 'Success!',
              text: resp.message,
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigateByUrl('/dashboard/alumnos');
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
