import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../../../services/docente.service';
import { Docente } from '../../../models/docente.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-docenteupdate',
  templateUrl: './docenteupdate.component.html',
  styles: [
  ]
})
export class DocenteupdateComponent implements OnInit {

  private docente: Docente;
  private idDocente: string;
  private token: string;
  public formSubmitted = false;

  public docenteupdateForm = this.formBuilder.group(
    {
      nombre: ['', Validators.required],
      edad: ['', Validators.required],
      titulo: ['', Validators.required],
      tipo: ['', Validators.required],
    }
  )

  constructor(private formBuilder: FormBuilder, private docenteService: DocenteService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.idDocente = this.activeRoute.snapshot.paramMap.get('id');
    this.token = this.getToken();
    this.docenteService.getSingleDocente(this.idDocente).subscribe((resp: any) => {
      if (resp.status) {
        this.docente = resp.data;
        this.initForm(this.docente);
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

  initForm(docente: Docente){
    this.docenteupdateForm = this.formBuilder.group(
      {
        nombre: [docente.nombre, Validators.required],
        edad: [docente.edad, Validators.required],
        titulo: [docente.titulo, Validators.required],
        tipo: [docente.tipo, Validators.required],
      }
    )
  }

  campoNoValido(campo: string): boolean {
    if (this.docenteupdateForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  actualizarDocente(){
    this.formSubmitted = true;
    if (this.docenteupdateForm.valid) {
      this.docenteService.updateDocente(this.idDocente, this.docenteupdateForm.value).subscribe(
        (resp: any) => {
          if (resp.status) {
            Swal.fire({
              title: 'Exito!',
              text: resp.message,
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigateByUrl('/dashboard/docentes');
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

  borrarDocente(){
    Swal.fire({
      title: 'Estas seguro de eliminar a:',
      text: this.docente.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.docenteService.deleteDocente(this.idDocente).subscribe(
          (resp: any) => {
            if (resp.status) {
              Swal.fire({
                title: 'Exito!',
                text: resp.message,
                icon: 'success',
                confirmButtonText: 'Ok'
              }).then((result: any) => {
                if (result.isConfirmed) {
                  this.router.navigateByUrl('/dashboard/docentes');
                }
              })
            }
          }
        )
      }
    })
  }
}
