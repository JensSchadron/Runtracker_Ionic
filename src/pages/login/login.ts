import {Component} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  templateUrl: 'login.html',
})
export class LoginPage {
  loginOrSignUp: string = "login";

  // We need to inject AuthService so that we can
  // use it in the view
  constructor(public auth: AuthService) {
  }

  static allFieldsFilledIn(mailaddress, password): boolean {
    return !(mailaddress == '' || password == '');
  }

  loginWithErrorHandling(mailaddress, password) {
    console.log(mailaddress + ' - ' + password);
    if (LoginPage.allFieldsFilledIn(mailaddress, password)) {
      this.auth.login(mailaddress, password).subscribe(data => {
        console.log('login succes');
      }, err => {
        console.log('login error');
      });
    }
  }

  signUpWithErrorHandling(mailaddress, password) {
    if (LoginPage.allFieldsFilledIn(mailaddress, password)) {
      this.auth.signup(mailaddress, password).subscribe(data => {
          console.log('signup succes');
        }, err => {
          console.log('signup error');
        }
      );
    }
  }
}
