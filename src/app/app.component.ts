import { Component, ViewChild }     from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen }  from 'ionic-native';

import { HomePage }                 from '../pages/home/home';
import { LoginPage }                from "../pages/login/login";
import { TrackingchoicePage }       from "../pages/trackingchoice/trackingchoice";
import { ProfilePage } from '../pages/profile/profile'
import { EditprofilePage } from "../pages/editprofile/editprofile";

import { AuthService }              from '../services/auth/auth.service';


@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  navDrawer: Array<{title: string, componentOrFunction: any}>;

  constructor(public platform: Platform, public menu: MenuController, public auth: AuthService) {
    this.initApp();

    this.navDrawer = [
      {
        title: "Home",
        componentOrFunction: () => {
          this.openPage(HomePage)
        }
      },
      {
        title: "New Tracking",
        componentOrFunction: () => {
          this.openPage(TrackingchoicePage)
        }
      },
      {
        title: "Profile",
        componentOrFunction: () => {
          this.openPage(ProfilePage)
        }
      },
      {
        title: "Log out",
        componentOrFunction: () => {
          auth.logout();
        }
      }
    ];
  }

  initApp() {
    this.platform.ready().then(() => {
      // Schedule a token refresh on app start up
      this.auth.handleAuthentication();

      this.rootPage = (this.auth.isAuthenticated() ? HomePage : LoginPage);
      console.log("Init - logged in:" + this.auth.isAuthenticated());

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  private openPage(page) {
    this.nav.setRoot(page);
  }

  onItemSelected(menuItem) {
    this.menu.close();
    console.log(typeof menuItem.componentOrFunction);
    // http://stackoverflow.com/a/6000016
    // if (!!(menuItem.componentOrFunction && menuItem.componentOrFunction.constructor && menuItem.componentOrFunction.call && menuItem.componentOrFunction.apply)) {
    if (typeof menuItem.componentOrFunction === 'function') {
      menuItem.componentOrFunction();
    }
  }
}
