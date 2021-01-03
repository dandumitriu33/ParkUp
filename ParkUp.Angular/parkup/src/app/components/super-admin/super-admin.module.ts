import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AllRolesComponent } from './all-roles.component';
import { CreateRoleComponent } from './create-role.component';

const routes: Routes = [
  { path: 'all-roles', component: AllRolesComponent },
  { path: 'create-role', component: CreateRoleComponent }
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
