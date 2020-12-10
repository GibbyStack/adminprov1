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

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: DashboardComponent, data: {titulo: 'Dashboard'} },
      {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'}},
      {path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes de cuenta'}},
      {path: 'alumnos', component: AlumnosComponent, data: {titulo: 'Alumnos'}},
      {path: 'docentes', component: DocentesComponent, data: {titulo: 'Docentes'}},
      {path: 'materias', component: MateriasComponent, data: {titulo: 'Materias'}},
      {path: 'updatealumno/:id', component: AlumnoupdateComponent, data: {titulo: 'Update Alumno'}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule {}
