import {Component}    from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Coordinate}   from "../../model/coordinate";
import {Observable, Subscription}   from "rxjs";
import {CoordinateService} from "../../services/location/coordinate.service"
import {LocationService} from "../../services/location/location.service";
import {TrackingResultPage} from "../tracking-result/tracking-result";
import {Tracking} from "../../model/tracking";
import {TrackingService} from "../../services/tracking/tracking.service";

@Component({
  selector: 'page-solotracking',
  templateUrl: 'solo-tracking.html'
})
export class SolotrackingPage {

  isTracking: boolean = true;
  coordinates: Coordinate[] = [];
  timeInSeconds: any = 0;
  timerDisplay: any = "00:00:00";

  distance: number = 0;
  distanceDisplay: string = "0.000";
  speedStamps: number[] = [];
  avgSpeed: number = 0;
  avgSpeedDisplay: string = "0.00";
  avgPace: number = 0;
  avgPaceDisplay: string = "00:00:00";

  currentSpeed: number = 0;

  //lat: any = "0";
  //lon: any = "0";

  timer: Observable<any>;
  timerSubscription: Subscription;

  locationSubscription: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, private coordinateService: CoordinateService, private locationService: LocationService, public trackingService: TrackingService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SolotrackingPage');

    // Start de timer
    this.timer = Observable.timer(0, 1000);
    this.timerSubscription = this.timer.subscribe(test => {
      this.timerTick();
    });

    // Geolocatie wordt gegeven elke keer de interne GPS een nieuwe positie vindt.
    this.startTracking();
  }

  startTracking() {
    this.locationSubscription = this.locationService.receiveLocation().subscribe((position) => {
      // Calculate distance
      let distanceTravelled = this.calculateDistance(position.coords.latitude, position.coords.longitude);
      this.distance += distanceTravelled;

      // Calculate speed
      this.currentSpeed = this.calculateSpeed(distanceTravelled, Date.now().valueOf());
      if (this.currentSpeed < 50) {
        this.speedStamps.push(this.currentSpeed);

        // Calculate average speed
        this.avgSpeed = this.calculateAvgSpeed();

        // Calculate average pace (how long does it take to run 1km)
        this.avgPace = this.calculateAvgPace();

        // Create new Coordinate
        this.addNewCoordinate(position.coords.latitude, position.coords.longitude, this.currentSpeed);

        // Refresh isTracking display
        this.setDistanceDisplay(this.distance);
        this.setAvgSpeedDisplay(this.avgSpeed);
        this.setAvgPaceDisplay(this.coordinateService.getSecondsAsDigitalClock(this.avgPace));

        //this.lat = position.coords.latitude;
        //this.lon = position.coords.longitude;

        console.log(this.timerDisplay + '- Distance: ' + this.distance + 'km - Speed: ' + this.currentSpeed + "kmph - Accuracy: " + position.coords.accuracy + "m");
      } else {
        console.log("Going too fast (" + this.currentSpeed + "kmph)! Did not persist.");
        if (this.coordinates.length > 0) {
          let prevCoord: Coordinate = this.coordinates[this.coordinates.length - 1];
          this.addNewCoordinate(prevCoord.lat, prevCoord.lon, 0);
          console.log("Previous coordinate persisted.")
        }
      }
    });
  }

  timerTick(): void {
    if (this.isTracking == true) {
      this.timeInSeconds++;
      this.timerDisplay = this.coordinateService.getSecondsAsDigitalClock(this.timeInSeconds);
    }
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

  private calculateAvgSpeed(): number {
    return this.coordinateService.calculateAvgSpeed(this.speedStamps);
  }

  private calculateAvgPace(): number {
    return this.coordinateService.calculateAvgPace(this.avgSpeed);
  }

  setDistanceDisplay(distance) {
    this.distanceDisplay = distance.toFixed(3);
  }

  setAvgSpeedDisplay(avgSpeed) {
    this.avgSpeedDisplay = avgSpeed.toFixed(2);
  }

  setAvgPaceDisplay(avgPace) {
    this.avgPaceDisplay = avgPace;
  }

  stopTracking(): void {
    this.timerSubscription.unsubscribe();
    this.locationSubscription.unsubscribe();
    let newTracking = this.createTracking();
    this.trackingService.saveTracking(newTracking).subscribe(() => { });

    let params = { tracking: newTracking, wasCompetition: false };
    this.navCtrl.setRoot(TrackingResultPage, params);

    console.log("Stopped Tracking!");
  }

  private createTracking(): Tracking {
    if (this.speedStamps.length === 0) {
      this.speedStamps.push(0);
      this.avgSpeed = 0;
      this.avgPace = 0;
    }

    let tracking           = new Tracking();
    tracking.avgSpeed      = this.avgSpeed;
    tracking.avgPace       = this.avgPace;
    tracking.competition   = null;
    tracking.coordinates   = this.coordinates;
    tracking.maxSpeed      = Math.max(...this.speedStamps);
    tracking.totalDistance = this.distance * 1000;
    tracking.totalDuration = this.timeInSeconds;

    //alert(JSON.stringify(tracking, null, 2));

    return tracking;
  }

}
