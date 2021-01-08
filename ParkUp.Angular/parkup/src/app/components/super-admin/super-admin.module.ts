import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../auth/auth.guard';
import { AllRolesComponent } from './all-roles.component';
import { CreateRoleComponent } from './create-role.component';

const routes: Routes = [
  { path: 'all-roles', component: AllRolesComponent, canActivate: [AuthGuard], data: {permittedRoles:['SuperAdmin']} },
  { path: 'create-role', component: CreateRoleComponent, canActivate: [AuthGuard], data: { permittedRoles: ['SuperAdmin'] } }
];

@NgModule({
  declarations: [
    AllRolesComponent,
    CreateRoleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SuperAdminModule { }
