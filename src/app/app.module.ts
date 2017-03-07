import { NgModule, ErrorHandler }   from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp }                    from './app.component';

import { HomePage }                 from '../pages/home/home';
import { LoginPage }                from "../pages/login/login";
import { FriendsProfilePage }       from "../pages/friends-profile/friends-profile";
import { EditprofilePage }          from "../pages/editprofile/editprofile";

import { SoloLocationPage }         from "../pages/solo-location/solo-location";
import { CountdownPage }            from "../pages/countdown/countdown";
import { SolotrackingPage }         from "../pages/solo-tracking/solo-tracking";
import { RankingPage }              from "../pages/ranking/ranking";
import { FriendsPage}               from "../pages/friends/friends";
import { FriendsRequestsPage}       from "../pages/friends/requests/friendrequests";
import { AddFriendsPage }           from "../pages/friends/add-friends/addfriends";
import { TabsPage }                 from "../pages/friends/tabs/tabs";


import { TrackingchoicePage }       from "../pages/tracking-choice/tracking-choice";
import { TrackinggoalPage }         from "../pages/trackinggoal/trackinggoal";
import { TrackingNotRealtimePage }  from "../pages/tracking-not-realtime/tracking-not-realtime";

import { CountdownModal }           from "../pages/countdown-modal/countdown-modal";
import { SolotrackingModal }        from "../pages/solotracking-modal/solotracking-modal";
import { TrackingResultPage }       from "../pages/tracking-result/tracking-result";

import { GeocodingService }         from '../services/location/geocoding.service'
import { CoordinateService }        from "../services/location/coordinate.service";

import { AUTH_PROVIDERS }           from 'angular2-jwt';
import { AuthService }              from '../services/auth/auth.service';
import { UserService }              from "../services/auth/user.service";
import { AuthHttpImpl }             from "../services/auth/auth-http-impl";
import { LocationService }          from "../services/location/location.service"
import { TrackingService }          from "../services/tracking/tracking.service"

import { ConfigService }            from "../services/mqtt/config/config.service";
import { MQTTService }              from "../services/mqtt/mqtt.service";

import { ChallengeFriendsPage }     from "../pages/challenge-friends/challenge-friends";
import { ChallengeDistancePage }    from "../pages/challenge-distance/challenge-distance";
import { ChallengeLoadPage }        from "../pages/challenge-load/challenge-load";
import {SearchPipe} from "../pages/friends/searchpipe";
// import { ChallengeTrackingPage }    from "../pages/challenge-tracking/challenge-tracking";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    FriendsProfilePage,
    EditprofilePage,
    FriendsPage,
    FriendsRequestsPage,
    AddFriendsPage,
    TabsPage,
    TrackingchoicePage,
    SoloLocationPage,
    CountdownPage,
    SolotrackingPage,
    RankingPage,
    TrackingResultPage,
    ChallengeFriendsPage,
    ChallengeDistancePage,
    ChallengeLoadPage,
    // ChallengeTrackingPage,
    RankingPage,
    SearchPipe
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    FriendsProfilePage,
    EditprofilePage,
    FriendsPage,
    FriendsRequestsPage,
    AddFriendsPage,
    TabsPage,
    TrackingchoicePage,
    SoloLocationPage,
    CountdownPage,
    SolotrackingPage,
    RankingPage,
    TrackingResultPage,
    ChallengeFriendsPage,
    ChallengeDistancePage,
    ChallengeLoadPage,
    // ChallengeTrackingPage,
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
    },
    LocationService,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    TrackingService,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    ConfigService,
    MQTTService
  ]
})
export class AppModule {}
