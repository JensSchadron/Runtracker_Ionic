import {Component} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  templateUrl: 'login.html',
})
export class LoginPage {

  // We need to inject AuthService so that we can
  // use it in the view
  constructor(public auth: AuthService) {

  }

  loginWithErrorHandling(mailaddress, password) {
    console.log(mailaddress + ' - ' + password);
    this.auth.login(mailaddress, password).subscribe(data => {
      console.log('login succes');
    }, err => {
      console.log('login error');
    });
  }
}
