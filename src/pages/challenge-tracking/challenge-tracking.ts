import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AuthHttpImpl} from "../../services/auth/auth-http-impl";
import {MQTTService} from "../../services/mqtt/mqtt.service";
import {UserService} from "../../services/auth/user.service";
import {TrackingService} from "../../services/tracking/tracking.service";
import {LocationService} from "../../services/location/location.service";
import {CoordinateService} from "../../services/location/coordinate.service";
import {User} from "../../model/user";
import {Subscription} from "rxjs";
import {Coordinate} from "../../model/coordinate";

@Component({
  selector: 'page-challenge-tracking',
  templateUrl: 'challenge-tracking.html'
})

export class ChallengeTrackingPage {
  private goalDistance: number;
  private totalDistance: number;

  private coordinates: Coordinate[] = [];
  private locationSubscription: Subscription;

  private currentSpeed: number;

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
    this.startTracking();
  }

  private startTracking(): void {
    this.locationSubscription = this.locationService.receiveLocation().subscribe((position) => {
      // Calculate distance
      let distanceTravelled = this.calculateDistance(position.coords.latitude, position.coords.longitude);
      this.totalDistance += distanceTravelled;

      // Create new Coordinate
      this.addNewCoordinate(position.coords.latitude, position.coords.longitude, this.currentSpeed);
    });
  }

  private addNewCoordinate(latitude, longitude, speed) {
    let coordinate   = new Coordinate();
    coordinate.lat   = latitude;
    coordinate.lon   = longitude;
    coordinate.speed = speed;
    coordinate.time  = Date.now().valueOf();
    this.coordinates.push(coordinate);
  }

  private calculateSpeed(distance, currentTime): number {
    let speed = 0;

    if (this.coordinates.length > 0) {
      let prevTime: number = this.coordinates[this.coordinates.length - 1].time;
      speed = this.coordinateService.calculateSpeed(distance, prevTime, currentTime);
    }

    return speed;
  }

  private calculateDistance(latitude, longitude) {
    let distance = 0;

    if (this.coordinates.length > 0) {
      let prevCoord: Coordinate = this.coordinates[this.coordinates.length - 1];
      distance = this.coordinateService.calculateDistanceBetweenCoordinates(latitude, longitude, prevCoord.lat, prevCoord.lon);
    }

    console.log("Total distance in km added: " + distance);
    return distance;
  }

}
