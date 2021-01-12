import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { SearchNearbyComponent } from './search-nearby.component';
import { SelectAreaComponent } from './select-area.component';
import { AdminModule } from '../admin/admin.module';




@NgModule({
  declarations: [
    HomeComponent,
    SearchNearbyComponent,
    SelectAreaComponent
  ],
  imports: [
    CommonModule,
    AdminModule,
    FormsModule
  ]
})
export class HomeModule { }
