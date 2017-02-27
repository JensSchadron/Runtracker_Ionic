import {Component, NgZone}    from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Geolocation}  from 'ionic-native';
import {Coordinate}   from "../../app/model/coordinate";
import {Observable}   from "rxjs";

@Component({
  selector: 'page-solotracking',
  templateUrl: 'solo-tracking.html'
})
export class SolotrackingPage {

  tracking: boolean = true;
  coordinates: Coordinate[];
  timeInSeconds: any = 0;
  timerDisplay: any = "00:00:00";

  distance: any = 0;
  speed: any = 0;
  avgSpeed: any = 0;
  avgPace: any = 0;

  lat: any = "0";
  lon: any = "0";

  timer: any;
  timerSub: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private zone: NgZone) {
    // Start timer.
    this.timerTick();

    // Start location tracking.
    this.timer = Observable.timer(1000, 1000);
    this.timerSub = this.timer.subscribe(test => {
      this.trackCoordinates();
      this.timerTick();
    });
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
      maximumAge        : 30000,
      timeout           : 1000
    };

    Geolocation.getCurrentPosition(options).then((position) => {
      this.zone.run(() => {
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        console.log(this.timerDisplay + ' ' + position.coords.latitude + ' ' + position.coords.longitude);
      });
    });
  }

  stopTracking(): void {

  }

}
