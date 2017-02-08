import {Component, ViewChild} from '@angular/core';
import {Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';

import {HomePage} from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {AuthService} from '../services/auth/auth.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  navDrawer: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public menu: MenuController, public auth: AuthService) {
    this.initApp();

    this.navDrawer = [
      {title: "Home", component: HomePage},
      {title: "Login", component: LoginPage}
    ];
  }

  initApp() {
    this.platform.ready().then(() => {
      // Schedule a token refresh on app start up
      this.auth.startupTokenRefresh();

      this.rootPage = (this.auth.authenticated() ? HomePage : LoginPage);
      console.log(this.auth.authenticated());

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page){
    this.menu.close();

    this.nav.setRoot(page.component);
  }
}
