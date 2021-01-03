import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { SearchNearbyComponent } from './search-nearby.component';
import { SelectAreaComponent } from './select-area.component';



@NgModule({
  declarations: [
    HomeComponent,
    SearchNearbyComponent,
    SelectAreaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
