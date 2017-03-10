import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AuthHttpImpl} from "../../services/auth/auth-http-impl";
import {MQTTService} from "../../services/mqtt/mqtt.service";
import {TrackingService} from "../../services/tracking/tracking.service";
import {LocationService} from "../../services/location/location.service";
import {CoordinateService} from "../../services/location/coordinate.service";
import {Subscription} from "rxjs";
import {Coordinate} from "../../model/coordinate";
import {Packet} from 'mqtt';

import {MQTTPacket, MQTTPacketType, TrackingPacket, WinPacket} from "../../services/mqtt/packet/mqtt.packet";
import {Competition} from "../../model/competition";
import {TrackingResultPage} from "../tracking-result/tracking-result";
import {Tracking} from "../../model/tracking";
import {BACKEND_BASEURL} from "../../assets/globals";

@Component({
  selector: 'page-challenge-tracking',
  templateUrl: 'challenge-tracking.html'
})

export class ChallengeTrackingPage {
  public currUserPacketCount: number = 0;
  public challengerPacketCount: number = 0;

  public goalDistance: number;
  public currUserTotalDistance: number;
  public currUserTotalDistanceVoorBerekening: number = 0;
  public challengerTotalDistance: number;

  private coordinates: Coordinate[] = [];
  private locationSubscription: Subscription;

  private currentSpeed: number;

  public competition: Competition;
  public currUserId: number;

  private submittedTrackings: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authHttp: AuthHttpImpl,
              public mqttService: MQTTService,
              private coordinateService: CoordinateService,
              private locationService: LocationService,
              public trackingService: TrackingService) {
    this.goalDistance = this.navParams.get('goalDistance');
    this.competition = this.navParams.get('competition');
    this.currUserId = this.navParams.get('currUserId');
    this.mqttService.compMessages.subscribe(this.on_next);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChallengeTrackingPage');
    this.startTracking();
  }

  private startTracking(): void {
    this.locationSubscription = this.locationService.receiveLocation().subscribe((position) => {
      let currCoordinate = new Coordinate(position.coords.latitude, position.coords.longitude, this.currentSpeed);

      // Calculate distance
      this.currUserTotalDistanceVoorBerekening += this.calculateDistance(position.coords.latitude, position.coords.longitude);
      this.coordinates.push(currCoordinate);

      let trackingPacket: TrackingPacket =
        new TrackingPacket(
          this.competition.competitionId,
          this.currUserId,
          currCoordinate,
          this.currUserTotalDistanceVoorBerekening);
      this.mqttService.publishInCompTopic(JSON.stringify(trackingPacket), 0);
    });
  }

  stopTracking(): void {
    this.locationSubscription.unsubscribe();
    let newTracking = this.createTracking();
    this.trackingService.saveTracking(newTracking).subscribe(() => {
    });

    let params = {tracking: newTracking};
    this.navCtrl.setRoot(TrackingResultPage, params);

    console.log("Stopped Tracking!");
  }

  private calculateSpeed(distance, currentTime): number {
    let speed = 0;

    if (this.coordinates.length > 0) {
      let prevTime: number = this.coordinates[this.coordinates.length - 1].time;
      speed = this.coordinateService.calculateSpeed(distance, prevTime, currentTime);
    }

    return speed;
  }

  private calculateDistance(latitude, longitude): number {
    let distance = 0;

    if (this.coordinates.length > 0) {
      let prevCoord: Coordinate = this.coordinates[this.coordinates.length - 1];
      distance = this.coordinateService.calculateDistanceBetweenCoordinates(latitude, longitude, prevCoord.lat, prevCoord.lon);
    }

    console.warn("Total distance in km added: " + distance);
    return distance;
  }

  private createTracking(): Tracking {
    let tracking = new Tracking();
    tracking.avgSpeed = 0; //TODO fix avgSPeed
    tracking.avgPace = 0; //TODO fix avgPace
    tracking.competition = null;
    tracking.coordinates = this.coordinates;
    tracking.maxSpeed = 0; //TODO fix maxSpeed
    tracking.totalDistance = this.currUserTotalDistance * 1000;
    tracking.totalDuration = this.currUserPacketCount; //TODO fix totalDuration

    return tracking;
  }

  private on_next = (message: Packet) => {
    let mqttPacket: MQTTPacket = JSON.parse(message.toString());
    if (mqttPacket.type === MQTTPacketType.TRACKING) {
      let trackingPacket: TrackingPacket = JSON.parse(message.toString());
      if (trackingPacket.userId === this.currUserId) {
        this.currUserPacketCount++;
        this.currUserTotalDistance = trackingPacket.totalDistance;
      } else {
        this.challengerPacketCount++;
        this.challengerTotalDistance = trackingPacket.totalDistance;
      }
      if (this.currUserId === this.competition.userCreated.userId) {
        if (this.currUserTotalDistance * 1000 >= this.goalDistance) {
          let winPacket: WinPacket = new WinPacket(this.competition.competitionId, this.currUserId);
          this.mqttService.publishInCompTopic(JSON.stringify(winPacket), 2);
        } else if (this.challengerTotalDistance * 1000 >= this.goalDistance) {
          let challenger = this.competition.usersRun.find((user) => user.userId !== this.currUserId);
          if (challenger !== null) { // zou altijd true moeten zijn
            let winPacket: WinPacket = new WinPacket(this.competition.competitionId, challenger.userId);
          }
        }
      }
    } else if (mqttPacket.type === MQTTPacketType.WIN && !this.submittedTrackings) {
      this.submittedTrackings = true;
      let winPacket: WinPacket = JSON.parse(message.toString());
      this.stopTracking();
      if (this.currUserId === winPacket.userIdWinner) {
        this.authHttp.getAuthHttp()
          .post(BACKEND_BASEURL + "/api/competitions/wins/" + this.competition.competitionId, "")
          .subscribe(() => console.log("\'User has won\' has been posted"));
      }
      this.authHttp.getAuthHttp()
        .post(BACKEND_BASEURL + "/api/competitions/addTracking/" + this.competition.competitionId, this.createTracking())
        .subscribe(() => console.log("Trackings have been posted"));
    }
  }
}
