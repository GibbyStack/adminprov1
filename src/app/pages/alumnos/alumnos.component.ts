import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../models/alumnos.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styles: [
  ]
})
export class AlumnosComponent implements OnInit {

  alumnos: Alumno[];
  constructor(private alumnoService: AlumnoService, private router: Router) { }

  ngOnInit(): void {
    this.alumnoService.getAllAlumnos().subscribe((resp: any) => {
      if (resp.status){
        this.alumnos = resp.data;
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

  updateAlumno(id){
    this.router.navigate(['/dashboard/updatealumno', id]);
  }

}
