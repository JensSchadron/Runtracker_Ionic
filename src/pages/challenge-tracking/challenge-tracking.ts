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
import {Packet} from 'mqtt';

import {MQTTPacket, MQTTPacketType, TrackingPacket} from "../../services/mqtt/packet/mqtt.packet";
import {Competition} from "../../model/competition";

@Component({
  selector: 'page-challenge-tracking',
  templateUrl: 'challenge-tracking.html'
})

export class ChallengeTrackingPage {
  public goalDistance: number;
  public currUserTotalDistance: number;
  public challengerTotalDistance: number;

  private coordinates: Coordinate[] = [];
  private locationSubscription: Subscription;

  private currentSpeed: number;

  public competition: Competition;
  public currUserId: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authHttp: AuthHttpImpl,
              public mqttService: MQTTService,
              private userService: UserService,
              private coordinateService: CoordinateService,
              private locationService: LocationService,
              public trackingService: TrackingService) {
    this.goalDistance = this.navParams.get('goalDistance');
    this.competition = this.navParams.get('competition');
    console.log("competition");
    console.log(this.competition);
    this.currUserId = this.navParams.get('currUserId');
    this.mqttService.compMessages.subscribe(this.on_next);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChallengeTrackingPage');
    this.startTracking();
  }

  private startTracking(): void {
    this.locationSubscription = this.locationService.receiveLocation().subscribe((position) => {
      // Calculate distance
      let distanceTravelled = this.calculateDistance(position.coords.latitude, position.coords.longitude);
      let totDistance = (this.currUserTotalDistance + distanceTravelled);

      let currCoordinate = new Coordinate(position.coords.latitude, position.coords.longitude, this.currentSpeed);

      let trackingPacket: TrackingPacket =
        new TrackingPacket(
          this.competition.competitionId,
          this.currUserId,
          currCoordinate,
          totDistance);
      this.mqttService.publishInCompTopic(JSON.stringify(trackingPacket));

      this.coordinates.push(currCoordinate);
    });
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

  private on_next = (message: Packet) => {
    let mqttPacket: MQTTPacket = JSON.parse(message.toString());
    if (mqttPacket.type === MQTTPacketType.TRACKING) {
      let trackingPacket: TrackingPacket = JSON.parse(message.toString());
      if (trackingPacket.userId === this.currUserId) {
        this.currUserTotalDistance = trackingPacket.totalDistance;
      } else {
        this.challengerTotalDistance = trackingPacket.totalDistance;
      }
    }
  }

}
