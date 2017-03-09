import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AuthHttpImpl} from "../../services/auth/auth-http-impl";
import {MQTTService} from "../../services/mqtt/mqtt.service";
import {UserService} from "../../services/auth/user.service";
import {TrackingService} from "../../services/tracking/tracking.service";
import {LocationService} from "../../services/location/location.service";
import {CoordinateService} from "../../services/location/coordinate.service";
import {User} from "../../model/user";

/*
 Generated class for the ChallengeTracking page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-challenge-tracking',
  templateUrl: 'challenge-tracking.html'
})
export class ChallengeTrackingPage {
  private goalDistance: number;
  private totalDistance: number;

  private challengers: User[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authHttp: AuthHttpImpl,
              public mqttService: MQTTService,
              private userService: UserService,
              private coordinateService: CoordinateService,
              private locationService: LocationService,
              public trackingService: TrackingService) {
    this.goalDistance = this.navParams.get('goalDistance');
    this.challengers = this.navParams.get('users');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChallengeTrackingPage');
  }

}
