import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  loginFormModel = {
    Email: '',
    Password: ''
  };
  loginErrorMessage = '';

  constructor(private usersService: UsersService,
              private router: Router) { }

  ngOnInit(): void {
    this.loginErrorMessage = '';
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/home');
    }
  }

  onSubmit(form: NgForm) {
    this.usersService.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.usersService.isUserLoggedIn.next(true);
        this.router.navigateByUrl('/home');
      },
      err => {
        if (err.status == 400) {
          this.loginErrorMessage = 'Incorrect Username or Password.';
        } else {
          console.log(err);
        }
      }
    );
  }

}
