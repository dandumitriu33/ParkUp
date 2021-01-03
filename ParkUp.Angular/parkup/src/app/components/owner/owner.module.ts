import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MyParkingSpacesComponent } from './my-parking-spaces.component';

const routes: Routes = [
  { path: 'my-parking-spaces', component: MyParkingSpacesComponent },
  
];

@NgModule({
  declarations: [
    MyParkingSpacesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class OwnerModule { }
