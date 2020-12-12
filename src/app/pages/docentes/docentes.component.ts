import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../../services/docente.service';
import { Docente } from '../../models/docente.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styles: [
  ]
})
export class DocentesComponent implements OnInit {

  docentes: Docente[];
  constructor(private docenteService: DocenteService, private router: Router) { }

  ngOnInit(): void {
    this.docenteService.getAllDocente().subscribe((resp: any) => {
      if (resp.status) {
        this.docentes = resp.data;
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

  updateDocente(id){
    this.router.navigate(['/dashboard/updatedocente', id]);
  }

}
