import { NgModule, ErrorHandler }   from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp }                    from './app.component';

import { HomePage }                 from '../pages/home/home';
import { LoginPage }                from "../pages/login/login";
import { ProfilePage }              from "../pages/profile/profile";
import { EditprofilePage }          from "../pages/editprofile/editprofile";

import { TrackingchoicePage }       from "../pages/tracking-choice/tracking-choice";
import { SoloLocationPage }         from "../pages/solo-location/solo-location";
import { CountdownPage }            from "../pages/countdown/countdown";
import { SolotrackingPage }         from "../pages/solo-tracking/solo-tracking";
import { RankingPage }              from "../pages/ranking/ranking";

import { GeocodingService }         from '../services/location/geocoding.service'
import { CoordinateService }        from "../services/location/coordinate.service";

import { AUTH_PROVIDERS }           from 'angular2-jwt';
import { AuthService }              from '../services/auth/auth.service';
import { UserService }              from "../services/auth/user.service";
import { AuthHttpImpl }             from "../services/auth/auth-http-impl";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ProfilePage,
    EditprofilePage,
    TrackingchoicePage,
    SoloLocationPage,
    CountdownPage,
    SolotrackingPage,
    RankingPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ProfilePage,
    EditprofilePage,
    TrackingchoicePage,
    SoloLocationPage,
    CountdownPage,
    SolotrackingPage,
    RankingPage
  ],
  providers: [
    AuthService,
    AuthHttpImpl,
    UserService,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    GeocodingService,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    CoordinateService,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    }
  ]
})
export class AppModule {}
