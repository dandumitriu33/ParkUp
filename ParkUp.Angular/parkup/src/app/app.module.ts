import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './components/home/home.module';
import { AccountModule } from './components/account/account.module';
import { OwnerModule } from './components/owner/owner.module';
import { AdminModule } from './components/admin/admin.module';
import { SuperAdminModule } from './components/super-admin/super-admin.module';
import { SharedModule } from './components/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    AccountModule,
    OwnerModule,
    AdminModule,
    SuperAdminModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
