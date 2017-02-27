import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';
import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Rx';

import {Storage}                  from '@ionic/storage';

import {Auth0Vars} from '../../auth0-variables';
import Auth0 from 'auth0-js';
import {App} from "ionic-angular";
import {HomePage} from "../../pages/home/home";
import {LoginPage} from "../../pages/login/login";
import {Profileinfo} from "../../model/profileinfo";
import {UserService} from "./user.service";

declare let auth0: any;

@Injectable()
export class AuthService {

  // Configure Auth0
  auth0 = new Auth0.WebAuth({
    domain: Auth0Vars.AUTH0_DOMAIN,
    clientID: Auth0Vars.AUTH0_CLIENT_ID,
    // specify your desired callback URL
    callbackURL: Auth0Vars.AUTH0_CALLBACK_URL,
    responseType: 'token id_token'
  });

  userProfile: Profileinfo;
  storage: Storage = new Storage();

  // private router: Router
  constructor(private app: App, private userService: UserService) {
  }

  public handleAuthentication(): void {
    console.log("handleAuthentication()");
    this.auth0.parseHash((err, authResult) => {
      console.log("handleAuthentication() pt.2");

      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setUser(authResult);
        console.log("executing handleAuthentication()");

        this.getUserInfoFromAuth0().then((profileInfo) => {
          this.userProfile = profileInfo;
          this.userService.getCreateUserFromBackEnd(this.userProfile).subscribe(() => {
            console.log("Callback called!!!");
            this.userService.setOnline().subscribe(() => {
              console.log("User is now online.");
            });
            this.app.getActiveNav().setRoot(HomePage);
          });
        }).catch((rejected) => console.log(rejected));

      } else if (authResult && authResult.error) {
        alert('Error: ' + authResult.error);
      }
    });
  }

  public login(username: string, password: string): Observable<any> {
    return new Observable(obs => this.auth0.client.login({
        realm: 'Username-Password-Authentication',
        username,
        password
      }, (err, authResult) => {
        if (err) {
          // alert('Error: ' + err.description);
          // return;
          return obs.error(err.description);
        }
        if (authResult && authResult.idToken && authResult.accessToken) {
          console.log("auth succesful! - executing login()");
          this.setUser(authResult);

          this.getUserInfoFromAuth0().then((profileInfo) => {
            this.userProfile = profileInfo;
            this.userService.getCreateUserFromBackEnd(this.userProfile).subscribe(() => {
              console.log("Callback called!!!");
              this.userService.setOnline().subscribe(() => {
                console.log("User is now online.");
              });
              this.app.getActiveNav().setRoot(HomePage);
              return obs.complete();
            });
          }).catch((rejected) => console.log(rejected));
        }
      })
    )
  }

  public signup(email: string, password: string): Observable<any> {
    return new Observable(obs => this.auth0.redirect.signupAndLogin({
      connection: 'Username-Password-Authentication',
      email,
      password,
    }, (err) => {
      if (err) {
        return obs.error();
      }
      return obs.complete();
    }));
  }

  public loginWithGoogle(): void {
    this.auth0.authorize({
      connection: 'google-oauth2',
      redirectUri: Auth0Vars.AUTH0_CALLBACK_URL
    })
  }

  public loginWithFacebook(): void {
    this.auth0.authorize({
      connection: 'facebook',
      redirectUri: Auth0Vars.AUTH0_CALLBACK_URL
    })
  }

  public isAuthenticated(): boolean {
    // Check whether the id_token is expired or not
    return tokenNotExpired();
  }

  public logout(): void {
    // Remove token from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    this.app.getActiveNav().setRoot(LoginPage);

    // Promise.all([
    //   this.storage.remove('access_token'),
    //   this.storage.remove('id_token')
    // ]).then(() => {
    //   this.app.getActiveNav().setRoot(LoginPage);
    // });
  }

  private setUser(authResult): void {
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    // return Promise.all([
    //   this.storage.set('access_token', authResult.accessToken),
    //   this.storage.set('id_token', authResult.idToken)
    // ]);
  }

  public getUserInfoFromAuth0(): Promise<Profileinfo> {
    console.log("Is it crashing in getUserInfoFromAuth0()?");
    const client = this.auth0.client;

    return new Promise(function (resolve, reject) {
      if (localStorage.getItem('access_token').length > 0) {

        // Fetch profile information
        client.userInfo(localStorage.getItem('access_token'), (error, profile) => {
          if (error) {
            // Handle error
            console.log("An error occured in getUserInfoFromAuth0()");
            console.log(error);
            return reject(error);
          }

          let userProfile;
          console.log("profile - " + JSON.stringify(profile));
          localStorage.setItem('profile', JSON.stringify(profile));
          if (profile.sub.indexOf("facebook") >= 0 || profile.sub.indexOf("google") >= 0) {
            console.log('given_name: %s', profile.given_name);
            userProfile = new Profileinfo(profile.email, profile.emailVerified, profile.nickname, profile.picture, profile.sub, profile.updatedAt, profile.given_name, profile.family_name, profile.gender);
          } else {
            userProfile = new Profileinfo(profile.email, profile.emailVerified, profile.nickname, profile.picture, profile.sub, profile.updatedAt, "", "", "");
          }

          console.log("profile after - " + JSON.stringify(userProfile));
          resolve(userProfile);
        })
      } else {
        return reject()
      }
      console.log("Isn't crashing in getUserInfoFromAuth0()");
    });
  }
}
