import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ApproveSpacesComponent } from './approve-spaces.component';
import { ApproveCashOutComponent } from './approve-cash-out.component';

const routes: Routes = [
  { path: 'approve-spaces', component: ApproveSpacesComponent },
  { path: 'approve-cash-out', component: ApproveCashOutComponent },
];

@NgModule({
  declarations: [
    ApproveSpacesComponent,
    ApproveCashOutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
