import {Storage} from '@ionic/storage';
import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';
import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Rx';

import {Auth0Vars} from '../../auth0-variables';
import Auth0 from 'auth0-js';
import {App} from "ionic-angular";
import {HomePage} from "../../pages/home/home";
import {LoginPage} from "../../pages/login/login";

// Avoid name not found warnings
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

  // private router: Router
  constructor(private app: App) {
  }

  public handleAuthentication(): void {
    console.log("handleAuthentication");
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        this.app.getActiveNav().setRoot(HomePage);
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
        this.setUser(authResult);
        this.app.getActiveNav().setRoot(HomePage);
        return obs.complete();
      }
    }));
  }

  public signup(email, password): void {
    this.auth0.redirect.signupAndLogin({
      connection: 'Username-Password-Authentication',
      email,
      password,
    }, function (err) {
      if (err) {
        alert('Error: ' + err.description);
      }
    });
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
  }

  private setUser(authResult): void {
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
  }
}

// @Injectable()
// export class AuthService {
//   jwtHelper: JwtHelper = new JwtHelper();
//   auth0 = new Auth0({clientID: Auth0Vars.AUTH0_CLIENT_ID, domain: Auth0Vars.AUTH0_DOMAIN });
//   lock = new Auth0Lock(Auth0Vars.AUTH0_CLIENT_ID, Auth0Vars.AUTH0_DOMAIN, {
//     auth: {
//       redirect: false,
//       params: {
//         scope: 'openid offline_access',
//       },
//       sso: false
//     }
//   });
//   storage: Storage = new Storage();
//   refreshSubscription: any;
//   user: Object;
//   zoneImpl: NgZone;
//   idToken: string;
//
//   constructor(private authHttp: AuthHttp, zone: NgZone) {
//     this.zoneImpl = zone;
//     // Check if there is a login saved in local storage
//     this.storage.get('profile').then(profile => {
//       this.user = JSON.parse(profile);
//     }).catch(error => {
//       console.log(error);
//     });
//
//     this.storage.get('id_token').then(token => {
//       this.idToken = token;
//     });
//
//     this.lock.on('authenticated', authResult => {
//       this.storage.set('id_token', authResult.idToken);
//       this.idToken = authResult.idToken;
//
//       // Fetch login information
//       this.lock.getProfile(authResult.idToken, (error, profile) => {
//         if (error) {
//           // Handle error
//           alert(error);
//           return;
//         }
//
//         profile.user_metadata = profile.user_metadata || {};
//         this.storage.set('profile', JSON.stringify(profile));
//         this.user = profile;
//       });
//
//       this.lock.hide();
//
//       this.storage.set('refresh_token', authResult.refreshToken);
//       this.zoneImpl.run(() => this.user = authResult.profile);
//       // Schedule a token refresh
//       this.scheduleRefresh();
//
//     });
//   }
//
//   public authenticated() {
//     return tokenNotExpired('id_token', this.idToken);
//   }
//
//   public login() {
//     // Show the Auth0 Lock widget
//     this.lock.show();
//   }
//
//   public logout() {
//     this.storage.remove('profile');
//     this.storage.remove('id_token');
//     this.idToken = null;
//     this.storage.remove('refresh_token');
//     this.zoneImpl.run(() => this.user = null);
//     // Unschedule the token refresh
//     this.unscheduleRefresh();
//   }
//
//   public scheduleRefresh() {
//     // If the user is authenticated, use the token stream
//     // provided by angular2-jwt and flatMap the token
//
//     let source = Observable.of(this.idToken).flatMap(
//       token => {
//         // The delay to generate in this case is the difference
//         // between the expiry time and the issued at time
//         let jwtIat = this.jwtHelper.decodeToken(token).iat;
//         let jwtExp = this.jwtHelper.decodeToken(token).exp;
//         let iat = new Date(0);
//         let exp = new Date(0);
//
//         let delay = (exp.setUTCSeconds(jwtExp) - iat.setUTCSeconds(jwtIat));
//
//         return Observable.interval(delay);
//       });
//
//     this.refreshSubscription = source.subscribe(() => {
//       this.getNewJwt();
//     });
//   }
//
//   public startupTokenRefresh() {
//     // If the user is authenticated, use the token stream
//     // provided by angular2-jwt and flatMap the token
//     if (this.authenticated()) {
//       let source = Observable.of(this.idToken).flatMap(
//         token => {
//           // Get the expiry time to generate
//           // a delay in milliseconds
//           let now: number = new Date().valueOf();
//           let jwtExp: number = this.jwtHelper.decodeToken(token).exp;
//           let exp: Date = new Date(0);
//           exp.setUTCSeconds(jwtExp);
//           let delay: number = exp.valueOf() - now;
//
//           // Use the delay in a timer to
//           // run the refresh at the proper time
//           return Observable.timer(delay);
//         });
//
//        // Once the delay time from above is
//        // reached, get a new JWT and schedule
//        // additional refreshes
//        source.subscribe(() => {
//          this.getNewJwt();
//          this.scheduleRefresh();
//        });
//     }
//   }
//
//   public unscheduleRefresh() {
//     // Unsubscribe fromt the refresh
//     if (this.refreshSubscription) {
//       this.refreshSubscription.unsubscribe();
//     }
//   }
//
//   public getNewJwt() {
//     // Get a new JWT from Auth0 using the refresh token saved
//     // in local storage
//     this.storage.get('refresh_token').then(token => {
//       this.auth0.refreshToken(token, (err, delegationRequest) => {
//         if (err) {
//           alert(err);
//         }
//         this.storage.set('id_token', delegationRequest.id_token);
//         this.idToken = delegationRequest.id_token;
//       });
//     }).catch(error => {
//       console.log(error);
//     });
//
//   }
// }
