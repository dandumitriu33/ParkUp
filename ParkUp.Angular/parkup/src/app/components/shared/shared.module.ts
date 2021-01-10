import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EditParkingSpaceComponent } from './edit-parking-space/edit-parking-space.component';


const routes: Routes = [
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'edit-parking-space/:id', component: EditParkingSpaceComponent }
];

@NgModule({
  declarations: [
    ForbiddenComponent,
    NotFoundComponent,
    EditParkingSpaceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class SharedModule { }
