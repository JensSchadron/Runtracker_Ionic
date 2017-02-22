import {Component, ViewChild} from '@angular/core';
import {Platform, MenuController, Nav, App} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';

import {HomePage} from '../pages/home/home';
import {ProfilePage} from '../pages/profile/profile'
import {EditprofilePage} from "../pages/editprofile/editprofile";
import {LoginPage} from "../pages/login/login";
import {AuthService} from '../services/auth/auth.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  navDrawer: Array<{title: string, componentOrFunction: any}>;

  constructor(public platform: Platform, public menu: MenuController, public auth: AuthService, public app : App) {
    this.initApp();

    this.navDrawer = [
      {
        title: "Home",
        componentOrFunction: HomePage
      },
      {
        title: "Profile",
        componentOrFunction: ProfilePage
      },
      {
        title: "Log out",
        componentOrFunction: function () {
          auth.logout();
        }
      }
    ];
  }

  initApp() {
    this.platform.ready().then(() => {
      // Schedule a token refresh on app start up
      this.auth.handleAuthentication();

      this.rootPage = (this.auth.isAuthenticated() ? EditprofilePage : LoginPage);
      console.log("Init - logged in:" + this.auth.isAuthenticated());

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  onItemSelected(menuItem) {
    this.menu.close();

    // http://stackoverflow.com/a/6000016
     //if (!!(menuItem.componentOrFunction && menuItem.componentOrFunction.constructor && menuItem.componentOrFunction.call && menuItem.componentOrFunction.apply)) {
    if (typeof menuItem.componentOrFunction === 'function') {
      menuItem.componentOrFunction();
      console.log("het is een functie " +menuItem.toString())
    } else {
      console.log(menuItem);
      this.nav.setRoot(menuItem.componentOrFunction).catch(() => console.log("Nav aangeroepen"));
    }
  }
}
