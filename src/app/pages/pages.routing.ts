import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AuthGuard } from '../guards/auth.guard';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { DocentesComponent } from './docentes/docentes.component';
import { MateriasComponent } from './materias/materias.component';
import { AlumnoupdateComponent } from './alumnos/alumnoupdate/alumnoupdate.component';
import { AlumnoaddComponent } from './alumnos/alumnoadd/alumnoadd.component';
import { DocenteupdateComponent } from './docentes/docenteupdate/docenteupdate.component';
import { DocenteaddComponent } from './docentes/docenteadd/docenteadd.component';
import { MateriaupdateComponent } from './materias/materiaupdate/materiaupdate.component';
import { MateriaaddComponent } from './materias/materiaadd/materiaadd.component';
import { MyprofileComponent } from './myprofile/myprofile.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: DashboardComponent, data: {titulo: 'Dashboard'} },
      {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'}},
      {path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes de cuenta'}},
      {path: 'alumnos', component: AlumnosComponent, data: {titulo: 'Students'}},
      {path: 'docentes', component: DocentesComponent, data: {titulo: 'Teachers'}},
      {path: 'materias', component: MateriasComponent, data: {titulo: 'Subjects'}},
      {path: 'updatealumno/:id', component: AlumnoupdateComponent, data: {titulo: 'Update Students'}},
      {path: 'addalumno', component: AlumnoaddComponent, data: {titulo: 'Add Students'}},
      {path: 'updatedocente/:id', component: DocenteupdateComponent, data: {titulo: 'Update Teachers'}},
      {path: 'adddocente', component: DocenteaddComponent, data: {titulo: 'Add Teachers'}},
      {path: 'updatemateria/:id', component: MateriaupdateComponent, data: {titulo: 'Update Subjects'}},
      {path: 'addmateria', component: MateriaaddComponent, data: {titulo: 'Add Subjects'}},
      {path: 'myprofile', component: MyprofileComponent, data: {titulo: 'My Profile'}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule {}
