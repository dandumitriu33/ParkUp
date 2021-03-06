import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './components/home/home.module';
import { AccountModule } from './components/account/account.module';
import { OwnerModule } from './components/owner/owner.module';
import { AdminModule } from './components/admin/admin.module';
import { SuperAdminModule } from './components/super-admin/super-admin.module';
import { SharedModule } from './components/shared/shared.module';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { UsersService } from './services/users.service';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    HomeModule,
    AccountModule,
    OwnerModule,
    AdminModule,
    SuperAdminModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [UsersService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
