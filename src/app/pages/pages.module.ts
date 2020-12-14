import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
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

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    PagesComponent,
    AccountSettingsComponent,
    AlumnosComponent,
    DocentesComponent,
    MateriasComponent,
    AlumnoupdateComponent,
    AlumnoaddComponent,
    DocenteupdateComponent,
    DocenteaddComponent,
    MateriaupdateComponent,
    MateriaaddComponent,
    MyprofileComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    PagesComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule, SharedModule, RouterModule, FormsModule, ComponentsModule, ReactiveFormsModule
  ]
})
export class PagesModule {}
