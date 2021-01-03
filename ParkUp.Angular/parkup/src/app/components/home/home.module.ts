import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { SearchNearbyComponent } from './search-nearby.component';



@NgModule({
  declarations: [
    HomeComponent,
    SearchNearbyComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
