import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AllRolesComponent } from './all-roles.component';

const routes: Routes = [
  { path: 'all-roles', component: AllRolesComponent },
];

@NgModule({
  declarations: [
    AllRolesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SuperAdminModule { }
