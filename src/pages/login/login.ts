import {Component, Inject} from '@angular/core';
import {AlertController} from 'ionic-angular';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  templateUrl: 'login.html',
})
export class LoginPage {
  loginOrSignUp: string = "login";

  // We need to inject AuthService so that we can
  // use it in the view
  constructor( private auth: AuthService, public alertCtrl: AlertController) {
  }

  static allFieldsFilledIn(mailaddress, password): boolean {
    return !(mailaddress == '' || password == '');
  }

  loginWithErrorHandling(mailaddress, password) {
    console.log(mailaddress + ' - ' + password);
    if (LoginPage.allFieldsFilledIn(mailaddress, password)) {
      this.auth.login(mailaddress, password).subscribe(data => {
        console.log('login success');
      }, err => {
        let alertTitle = 'Login error';
        let alertMessage = 'An error has occurred while logging in.';

        console.log(alertTitle);

        this.showAlert(alertTitle, alertMessage)
      });
    } else {
      let alertTitle = 'Login error';
      let alertMessage = 'An error has occurred while logging in.';

      console.log(alertTitle);

      this.showAlert(alertTitle, alertMessage)
    }
  }

  signUpWithErrorHandling(mailaddress, password) {
    if (LoginPage.allFieldsFilledIn(mailaddress, password)) {
      this.auth.signup(mailaddress, password).subscribe(data => {
          let alertTitle = 'Sign up success';
          let alertMessage = 'A verification email will be sent.';

          console.log(alertTitle);

          this.showAlert(alertTitle, alertMessage)

        }, err => {
          let alertTitle = 'Sign up error';
          let alertMessage = 'An error has occurred while signing up.';

          console.log(alertTitle);

          this.showAlert(alertTitle, alertMessage)
        }
      );
    }
  }

  showAlert(alertTitle, alertMessage) {
    let alert = this.alertCtrl.create({
      title: alertTitle,
      subTitle: alertMessage,
      buttons: ['OK']
    });
    alert.present();
  }
}
