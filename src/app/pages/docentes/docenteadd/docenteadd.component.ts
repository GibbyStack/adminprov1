import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DocenteService } from '../../../services/docente.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-docenteadd',
  templateUrl: './docenteadd.component.html',
  styles: [
  ]
})
export class DocenteaddComponent implements OnInit {

  private token: string;
  public formSubmitted = false;

  public docenteaddForm = this.formBuilder.group(
    {
      nombre: ['', Validators.required],
      edad: ['', Validators.required],
      titulo: ['', Validators.required],
      tipo: ['', Validators.required],
    }
  )

  constructor(private formBuilder: FormBuilder, private docenteService: DocenteService, private router: Router) { }

  ngOnInit(): void {
    this.token = this.getToken();
  }

  getToken(){
    return localStorage.getItem('token');
  }

  campoNoValido(campo: string): boolean {
    if (this.docenteaddForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  crearDocente(){
    this.formSubmitted = true;
    if (this.docenteaddForm.valid) {
      this.docenteService.addDocente(this.docenteaddForm.value).subscribe(
        (resp: any) => {
          if (resp.status) {
            Swal.fire({
              title: 'Exito!',
              text: resp.message,
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigateByUrl('/dashboard/docentes')
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
