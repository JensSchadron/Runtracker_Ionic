import {Component, NgZone}    from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Geolocation}  from 'ionic-native';
import {Coordinate}   from "../../model/coordinate";
import {Observable}   from "rxjs";
import {CoordinateService} from "../../services/location/coordinate.service"

@Component({
  selector: 'page-solotracking',
  templateUrl: 'solo-tracking.html'
})
export class SolotrackingPage {

  tracking: boolean = true;
  coordinates: Coordinate[] = [];
  timeInSeconds: any = 0;
  timerDisplay: any = "00:00:00";

  distance: number = 0;
  distanceDisplay: string = "0";
  speedStamps: number[] = [];
  avgSpeed: number = 0;
  avgSpeedDisplay: string = "0";
  avgPace: number = 0;
  avgPaceDisplay: string = "0";

  currentSpeed: number = 0;

  countSucces: number = 0;
  countError: number = 0;

  lat: any = "0";
  lon: any = "0";

  timer: any;
  timerSub: any;

  timer2: any;
  timer2Sub: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private zone: NgZone, private coordinateService: CoordinateService) {
    // Start timer.
    this.timerTick();

    // Start location tracking.
    this.timer = Observable.timer(0, 1000);
    this.timerSub = this.timer.subscribe(test => {
      //this.trackCoordinates();
      this.timerTick();
    });

    this.timer2 = Observable.timer(0, 2000);
    this.timer2Sub = this.timer2.subscribe(test => {
      this.trackCoordinates();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SolotrackingPage');
  }

  timerTick(): void {
    if (this.tracking == true) {
      this.timeInSeconds++;
      this.timerDisplay = this.getSecondsAsDigitalClock(this.timeInSeconds);
    }
  }

  getSecondsAsDigitalClock(inputSeconds: number): string {
    let sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);
    let hoursString = (hours < 10) ? "0" + hours : hours.toString();
    let minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    let secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString;
  }

  trackCoordinates(): void {
    let options = {
      enableHighAccuracy: true,
      maximumAge: 4000,
      timeout: 4000
    };

    Geolocation.getCurrentPosition(options).then((position) => {
      this.zone.run(() => {
        // Calculate distance (kilometers)
        let distanceTravelled = this.calculateDistance(position.coords.latitude, position.coords.longitude);
        this.distance += distanceTravelled;

        // Calculate current speed in kilometers per hour
        // (distanceTravelled is per second, there are 3600 seconds in an hour)
        //this.currentSpeed = distanceTravelled * 3600;
        this.currentSpeed = distanceTravelled * 900;
        this.speedStamps.push(this.currentSpeed);

        // Calculate average speed
        let sum = this.speedStamps.reduce(function (a, b) { return a + b; });
        this.avgSpeed = sum / this.speedStamps.length;

        // Calculate average pace (how long does it take to run 1km)

        // Create new Coordinate
        this.addNewCoordinate(position.coords.latitude, position.coords.longitude, this.currentSpeed);

        this.setAvgSpeedDisplay(this.avgSpeed);
        this.setDistanceDisplay(this.distance);

        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        this.countSucces++;

        console.log(this.timerDisplay + '- Distance: ' + this.distance + 'km - Speed: ' + this.currentSpeed + "kmph");
      });
    }).catch((error) => {
      console.log('Error getting location', error);
      this.countError++;
    });
  }

  private addNewCoordinate(latitude, longitude, speed) {
    let coordinate = new Coordinate();
    coordinate.lat = latitude;
    coordinate.lon = longitude;
    coordinate.speed = speed;
    coordinate.time = Date.now().valueOf();
    this.coordinates.push(coordinate);
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

  setDistanceDisplay(distance) {
    this.distanceDisplay = distance.toFixed(3);
  }

  setAvgSpeedDisplay(avgSpeed) {
    this.avgSpeedDisplay = avgSpeed.toFixed(2);
  }

  stopTracking(): void {
    this.timerSub.unsubscribe();
    this.timer2Sub.unsubscribe();
    console.log("Stopped tracking!");
  }

}
