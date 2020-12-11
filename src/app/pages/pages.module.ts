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

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    PagesComponent,
    AccountSettingsComponent,
    AlumnosComponent,
    DocentesComponent,
    MateriasComponent,
    AlumnoupdateComponent
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
