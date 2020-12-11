import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../../../services/alumno.service';
import { Alumno } from '../../../models/alumnos.model';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-alumnoupdate',
  templateUrl: './alumnoupdate.component.html',
  styles: [
  ]
})
export class AlumnoupdateComponent implements OnInit{
  
  alumno: Alumno;
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
    let idAlumno = this.activeRoute.snapshot.paramMap.get('id');
    let token = this.getToken();
    this.alumnoservice.getSingleAlumno(idAlumno).subscribe((resp: any) => {
      if (resp.status) {
        this.alumno = resp.data;
        console.log(this.alumno);
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
}
