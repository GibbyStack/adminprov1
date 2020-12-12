import { Component, OnInit } from '@angular/core';
import { MateriaService } from '../../services/materia.service';
import { Router } from '@angular/router';
import { Materia } from 'src/app/models/materia.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styles: [
  ]
})
export class MateriasComponent implements OnInit {

  materias: Materia[];
  constructor(private materiaService: MateriaService, private router: Router) { }

  ngOnInit(): void {
    this.materiaService.getAllMaterias().subscribe((resp: any) => {
      if (resp.status) {
        this.materias = resp.data;
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

  updateMateria(id){
    this.router.navigate(['/dashboard/updatemateria/', id]);
  }

}
