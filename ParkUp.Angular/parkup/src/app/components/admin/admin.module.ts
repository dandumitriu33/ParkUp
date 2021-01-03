import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ApproveSpacesComponent } from './approve-spaces.component';

const routes: Routes = [
  { path: 'approve-spaces', component: ApproveSpacesComponent },
];

@NgModule({
  declarations: [
    ApproveSpacesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
