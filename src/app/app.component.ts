import { Component, ViewChild, OnDestroy } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen }  from 'ionic-native';

import { HomePage }                 from '../pages/home/home';
import { LoginPage }                from "../pages/login/login";
import { TrackingchoicePage }       from "../pages/tracking-choice/tracking-choice";
import { FriendsProfilePage }              from '../pages/friends-profile/friends-profile'
import { EditprofilePage }          from "../pages/editprofile/editprofile";
import { RankingPage }              from "../pages/ranking/ranking";

import { FriendsPage }              from "../pages/friends/friends-overview/friends";
import { TabsPage }                 from "../pages/friends/tabs/tabs";


import { AuthService }              from '../services/auth/auth.service';
import { UserService }              from "../services/auth/user.service";
import { LocationService }          from "../services/location/location.service";



@Component({
  templateUrl: 'app.html'
})

export class MyApp implements OnDestroy {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  navDrawer: Array<{title: string, componentOrFunction: any}>;

  constructor(public platform: Platform, public menu: MenuController, public auth: AuthService, public userService: UserService, private locationService: LocationService) {
    this.initApp();

    this.navDrawer = [
      {
        title: "Home",
        componentOrFunction: () => {
          this.openPage(HomePage, true)
        }
      },
      {
        title: "New Tracking",
        componentOrFunction: () => {
          this.openPage(TrackingchoicePage, false)
        }
      },
      {
        title: "Friends",
        componentOrFunction: () => {
          this.openPage(TabsPage, false)
        }
      },
      {
        title: "Profile",
        componentOrFunction: () => {
          this.openPage(EditprofilePage, false)
        }
      },
      {
        title: "Ranking",
        componentOrFunction: () => {
          this.openPage(RankingPage, false)
        }
      },
      {
        title: "Log out",
        componentOrFunction: () => {
          this.userService.setOffline()
            .subscribe(() => {
              console.log("User is now offline.");
              auth.logout();
            });
          // console.log("User is now offline.");
        }
      }
    ];
  }

  initApp() {
    this.platform.ready().then(() => {
      // Schedule a token refresh on app start up
      this.auth.handleAuthentication();

      // this.rootPage = (this.auth.isAuthenticated() ? HomePage : LoginPage);
      if (this.auth.isAuthenticated()) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage;
      }
      console.log("Init - logged in:" + this.auth.isAuthenticated());

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      // Start location tracking.
      this.locationService.startTracking();
    });
  }

  private openPage(page, setRoot: boolean) {
    if (setRoot) {
      this.nav.setRoot(page);
    } else {
      this.nav.push(page);
    }
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

  ngOnDestroy(): void {
    // Stop location tracking.
    this.locationService.stopTracking();

    if (this.auth.isAuthenticated()) {
      // console.log("User is now offline.");
      this.userService.setOffline().subscribe(() => {
        console.log("User is now offline.");
      });
    }
  }
}
