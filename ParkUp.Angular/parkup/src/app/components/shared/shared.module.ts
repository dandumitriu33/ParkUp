import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EditParkingSpaceComponent } from './edit-parking-space/edit-parking-space.component';
import { EditCityComponent } from './edit-city/edit-city.component';
import { EditAreaComponent } from './edit-area/edit-area.component';
import { AuthGuard } from '../../auth/auth.guard';


const routes: Routes = [
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'edit-parking-space/:id', component: EditParkingSpaceComponent },
  { path: 'edit-city/:id', component: EditCityComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'SuperAdmin'] } },
  { path: 'edit-area/:id', component: EditAreaComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'SuperAdmin'] } },
];

@NgModule({
  declarations: [
    ForbiddenComponent,
    NotFoundComponent,
    EditParkingSpaceComponent,
    EditCityComponent,
    EditAreaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class SharedModule { }
