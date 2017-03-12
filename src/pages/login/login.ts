import {Component, NgZone} from '@angular/core';
import {AlertController, LoadingController} from 'ionic-angular';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  loginOrSignUp: string = "login";
  private loading;

  // We need to inject AuthService so that we can use it in the view
  constructor(private auth: AuthService, private zone: NgZone, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({
      content: 'Logging in...'
    });
  }

  static allFieldsFilledIn(mailaddress, password): boolean {
    return !(mailaddress == '' || password == '');
  }

  public loginWithErrorHandling(mailaddress, password) {
    this.loading.present();

    if (LoginPage.allFieldsFilledIn(mailaddress, password)) {
      this.auth.login(mailaddress, password).subscribe(null,
        (err) => {
          let alertTitle = 'Login error';
          let alertMessage = 'An error has occurred while logging in.';

          console.log(alertTitle);

          this.zone.run(() => {
            this.loading.dismiss()
          });

          this.showAlert(alertTitle, alertMessage)
        },
        () => {
          console.log('login success');
          this.zone.run(() => {
            this.loading.dismiss();
          });
        });
    } else {
      let alertTitle = 'Login error';
      let alertMessage = 'An error has occurred while logging in.';

      console.log(alertTitle);

      this.loading.dismiss();

      this.showAlert(alertTitle, alertMessage)
    }

  }

  public signUpWithErrorHandling(mailaddress, password) {
    this.loading.present();

    if (LoginPage.allFieldsFilledIn(mailaddress, password)) {
      this.auth.signup(mailaddress, password).subscribe(null,
        (err) => {
          let alertTitle = 'Sign up error';
          let alertMessage = 'An error has occurred while signing up.';

          console.log(alertTitle);

          this.loading.dismiss();

          this.showAlert(alertTitle, alertMessage)
        },
        () => {
          let alertTitle = 'Sign up success';
          let alertMessage = 'A verification email will be sent.';

          console.log(alertTitle);

          this.zone.run(() => {
            this.loading.dismiss();
          });

          this.showAlert(alertTitle, alertMessage)
        }
      );
    }
  }

  private showAlert(alertTitle, alertMessage) {
    let alert = this.alertCtrl.create({
      title: alertTitle,
      subTitle: alertMessage,
      buttons: ['OK']
    });
    alert.present();
  }
}
