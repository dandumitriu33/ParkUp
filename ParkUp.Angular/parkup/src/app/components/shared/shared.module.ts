import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ForbiddenComponent } from './forbidden/forbidden.component';

const routes: Routes = [
  { path: 'forbidden', component: ForbiddenComponent }
];

@NgModule({
  declarations: [ForbiddenComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SharedModule { }
