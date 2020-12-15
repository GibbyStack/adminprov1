import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../../../services/alumno.service';
import { Alumno } from '../../../models/alumnos.model';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-alumnoupdate',
  templateUrl: './alumnoupdate.component.html',
  styles: [
  ]
})
export class AlumnoupdateComponent implements OnInit{

  private alumno: Alumno;
  private idAlumno: string;
  private token: string;
  public formSubmitted = false;

  public alumnoupdateForm = this.formBuilder.group(
    {
      nombre: ['', Validators.required],
      edad: ['', Validators.required],
      sexo: ['', Validators.required],
      semestre: ['', Validators.required],
      carrera: ['', Validators.required],
    }
  )

  constructor(private formBuilder: FormBuilder, private alumnoservice: AlumnoService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.idAlumno = this.activeRoute.snapshot.paramMap.get('id');
    this.token = this.getToken();
    this.alumnoservice.getSingleAlumno(this.idAlumno).subscribe((resp: any) => {
      if (resp.status) {
        this.alumno = resp.data;
        this.initForm(this.alumno);
      } else {
        Swal.fire({
          title: 'Error!',
          text: resp.message,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    })
  }

  getToken(){
    return localStorage.getItem('token');
  }

  initForm(alumno: Alumno){
    this.alumnoupdateForm = this.formBuilder.group(
      {
        nombre: [alumno.nombre, Validators.required],
        edad: [alumno.edad, Validators.required],
        sexo: [alumno.sexo, Validators.required],
        semestre: [alumno.semestre, Validators.required],
        carrera: [alumno.carrera, Validators.required],
      }
    )
  }

  campoNoValido(campo: string): boolean {
    if (this.alumnoupdateForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  actualizarAlumno(){
    this.formSubmitted = true;
    if (this.alumnoupdateForm.valid) {
      this.alumnoservice.updateAlumno(this.idAlumno, this.alumnoupdateForm.value).subscribe(
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

  borrarAlumno(){
    Swal.fire({
      title: 'Estas seguro de eliminar a:',
      text: this.alumno.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.alumnoservice.deleteAlumno(this.idAlumno).subscribe(
          (resp: any) => {
            if (resp.status) {
              Swal.fire({
                title: 'Success!',
                text: resp.message,
                icon: 'success',
                confirmButtonText: 'Ok'
              }).then((result: any) => {
                if (result.isConfirmed) {
                  this.router.navigateByUrl('/dashboard/alumnos');
                }
              })
            }
          }
        )
      }
    })
  }
}
