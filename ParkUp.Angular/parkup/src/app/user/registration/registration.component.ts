import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: [
  ]
})
export class RegistrationComponent implements OnInit {
  userCreationMessage: string;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.registrationFormModel.reset();
    this.userCreationMessage = '';
  }

  onSubmit() {
    this.usersService.register().subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.usersService.registrationFormModel.reset();
          this.userCreationMessage = 'Registration successful.';
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.userCreationMessage = 'This user already exists.';
                break;
              default:
                this.userCreationMessage = element.description + ' Registration unsuccessful. Please try again later.';
                break;
            }
          }
          )
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
