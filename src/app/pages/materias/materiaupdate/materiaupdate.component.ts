import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MateriaService } from '../../../services/materia.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Materia } from 'src/app/models/materia.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-materiaupdate',
  templateUrl: './materiaupdate.component.html',
  styles: [
  ]
})
export class MateriaupdateComponent implements OnInit {

  private materia: Materia;
  private idMateria: string;
  private token: string;
  public formSubmitted = false;

  public materiaupdateForm = this.formBuilder.group(
    {
      nombre: ['', Validators.required],
      horas: ['', Validators.required],
      creditos: ['', Validators.required]
    }
  )

  constructor(private formBuilder: FormBuilder, private materiaService: MateriaService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.idMateria = this.activeRoute.snapshot.paramMap.get('id');
    this.token = this.getToken();
    this.materiaService.getSingleMateria(this.idMateria).subscribe((resp: any) => {
      if (resp.status) {
        this.materia = resp.data;
        this.initForm(this.materia);
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

  initForm(materia: Materia){
    this.materiaupdateForm = this.formBuilder.group(
      {
        nombre: [materia.nombre, Validators.required],
        horas: [materia.horas, Validators.required],
        creditos: [materia.creditos, Validators.required],
      }
    )
  }

  campoNoValido(campo: string): boolean {
    if (this.materiaupdateForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  actualizarMateria(){
    this.formSubmitted = true;
    if (this.materiaupdateForm.valid) {
      this.materiaService.updateMateria(this.idMateria, this.materiaupdateForm.value).subscribe(
        (resp: any) => {
          if ( resp.status) {
            Swal.fire({
              title: 'Exito!',
              text: resp.message,
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigateByUrl('/dashboard/materias');
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
        (err) => console.warn()
      );
    } else {
      console.log('formulario no valido');
    }
  }

  borrarMateria(){
    Swal.fire({
      title: 'Estas seguro de eliminar a:',
      text: this.materia.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.materiaService.deleteMateria(this.idMateria).subscribe(
          (resp: any) => {
            if (resp.status) {
              Swal.fire({
                title: 'Exito!',
                text: resp.message,
                icon: 'success',
                confirmButtonText: 'Ok'
              }).then((result: any) => {
                if (result.isConfirmed) {
                  this.router.navigateByUrl('/dashboard/materias');
                }
              })
            }
          }
        )
      }
    })
  }
}
