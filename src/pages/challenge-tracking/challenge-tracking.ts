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

import {
  MQTTPacket, MQTTPacketType, TrackingPacket, WinPacket,
  SurrenderPacket
} from "../../services/mqtt/packet/mqtt.packet";
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
  public currUserTotalDistance: number = 0;
  public currUserTotalDistanceVoorBerekening: number = 0;
  public challengerTotalDistance: number = 0;

  private coordinates: Coordinate[] = [];
  private locationSubscription: Subscription;
  private competitionSubscription: Subscription;

  private currentSpeed: number;
  private speedStamps: number[] = [];

  public competition: Competition;
  public currUserId: number;

  private sendWinPacket: boolean = false;
  private submittedTrackings: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authHttp: AuthHttpImpl,
              public mqttService: MQTTService,
              private coordinateService: CoordinateService,
              private locationService: LocationService) {
    this.goalDistance = this.navParams.get('goalDistance');
    this.competition = this.navParams.get('competition');
    this.currUserId = this.navParams.get('currUserId');
    this.competitionSubscription = this.mqttService.compMessages.subscribe(this.on_next);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChallengeTrackingPage');
    this.startTracking();
  }

  private startTracking(): void {
    this.locationSubscription = this.locationService.receiveLocation().subscribe((position) => {

      // Calculate distance
      let distanceTravelled = this.calculateDistance(position.coords.latitude, position.coords.longitude);
      this.currUserTotalDistanceVoorBerekening += distanceTravelled;

      // Calculate speed
      this.currentSpeed = this.calculateSpeed(distanceTravelled, Date.now().valueOf());
      if (this.currentSpeed < 50)
        this.speedStamps.push(this.currentSpeed);


      let currCoordinate = new Coordinate(position.coords.latitude, position.coords.longitude, this.currentSpeed);
      this.coordinates.push(currCoordinate);

      let trackingPacket: TrackingPacket =
        new TrackingPacket(
          this.competition.competitionId,
          this.currUserId,
          currCoordinate,
          this.currUserTotalDistanceVoorBerekening >= this.competition.goal.distance / 1000 ? this.competition.goal.distance / 1000 : this.currUserTotalDistanceVoorBerekening);
      this.mqttService.publishInCompTopic(JSON.stringify(trackingPacket), 0);
    });
  };

  stopTracking(): void {
    this.locationSubscription.unsubscribe();
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

  private calculateAvgSpeed(): number {
    return this.coordinateService.calculateAvgSpeed(this.speedStamps);
  }

  private calculateAvgPace(avgSpeed: number): number {
    return this.coordinateService.calculateAvgPace(avgSpeed);
  }

  private calculateMaxSpeed(): number {
    return this.coordinateService.calculateMaxSpeed(this.speedStamps);
  }

  private createTracking(): Tracking {
    let tracking = new Tracking();

    let avgSpeed = (this.speedStamps.length === 0) ? 0 : this.calculateAvgSpeed();
    let avgPace = (avgSpeed === 0) ? 0 : this.calculateAvgPace(avgSpeed);

    let maxSpeed = 0;
    if (this.speedStamps.length > 0) {
      maxSpeed = this.calculateMaxSpeed();
      this.coordinates.forEach(c => {
        if (c.speed > maxSpeed) {
          c.speed = maxSpeed;
        }
      });
    }

    let durationInSeconds = (this.coordinates.length === 0) ? 0 : Math.round((this.coordinates[this.coordinates.length - 1].time - this.coordinates[0].time) / 1000);

    tracking.avgSpeed = avgSpeed;
    tracking.avgPace = avgPace;
    tracking.competition = null;
    tracking.coordinates = this.coordinates;
    tracking.maxSpeed = maxSpeed;
    tracking.totalDistance = this.currUserTotalDistance * 1000;
    tracking.totalDuration = durationInSeconds;

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
      if (this.currUserId === this.competition.userCreated.userId && !this.sendWinPacket) {
        if (this.currUserTotalDistance * 1000 >= this.competition.goal.distance) {
          this.sendWinPacket = true;

          let winPacket: WinPacket = new WinPacket(this.competition.competitionId, this.currUserId);
          this.mqttService.publishInCompTopic(JSON.stringify(winPacket), 2);
        } else if (this.challengerTotalDistance * 1000 >= this.competition.goal.distance) {
          this.sendWinPacket = true;

          let challenger = this.competition.usersRun.find((user) => {
            return user.userId !== this.currUserId
          });

          let winPacket: WinPacket = new WinPacket(this.competition.competitionId, challenger.userId);
          this.mqttService.publishInCompTopic(JSON.stringify(winPacket), 2);
        }
      }
    } else if (mqttPacket.type === MQTTPacketType.WIN && !this.submittedTrackings) {
      this.submittedTrackings = true;

      this.competitionSubscription.unsubscribe();
      this.stopTracking();

      let winPacket: WinPacket = JSON.parse(message.toString());
      if (this.currUserId === winPacket.userIdWinner) {
        this.authHttp.getAuthHttp()
          .post(BACKEND_BASEURL + "/api/competitions/wins/" + this.competition.competitionId, "")
          .subscribe(() => console.log("\'User has won\' has been posted"));
      }

      let newTracking = this.createTracking();
      this.authHttp.getAuthHttp()
        .post(BACKEND_BASEURL + "/api/competitions/addTracking/" + this.competition.competitionId, newTracking)
        .subscribe(() => console.log("Trackings have been posted"));

      let params = {tracking: newTracking, wasCompetition: true, hasWon: this.currUserId === winPacket.userIdWinner};
      this.navCtrl.setRoot(TrackingResultPage, params);
    } else if (mqttPacket.type === MQTTPacketType.SURRENDER && !this.submittedTrackings) {
      this.submittedTrackings = true;

      this.competitionSubscription.unsubscribe();
      this.stopTracking();

      let surrenderPacket: SurrenderPacket = JSON.parse(message.toString());
      if (surrenderPacket.userIdSurrendered !== this.currUserId) {
        this.authHttp.getAuthHttp()
          .post(BACKEND_BASEURL + "/api/competitions/wins/" + this.competition.competitionId, "")
          .subscribe(() => console.log("\'User has won\' has been posted"));
      }

      let newTracking = this.createTracking();
      this.authHttp.getAuthHttp()
        .post(BACKEND_BASEURL + "/api/competitions/addTracking/" + this.competition.competitionId, newTracking)
        .subscribe(() => console.log("Trackings have been posted"));

      let params = {
        tracking: newTracking,
        wasCompetition: true,
        hasWon: this.currUserId !== surrenderPacket.userIdSurrendered
      };
      this.navCtrl.setRoot(TrackingResultPage, params);
    }
  };

  private surrender(): void {
    let surrenderPacket: SurrenderPacket =
      new SurrenderPacket(
        this.competition.competitionId,
        this.currUserId);

    this.mqttService.publishInCompTopic(JSON.stringify(surrenderPacket), 2);
  }

}
