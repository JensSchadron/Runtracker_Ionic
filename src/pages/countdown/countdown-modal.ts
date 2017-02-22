import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

/*
  Generated class for the Countdown page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'modal-countdown',
  templateUrl: 'countdown-modal.html'
})
export class CountdownModal {

  timerCount: any;
  displayTime: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.timerCount = navParams.get("timerDuration");
    this.timerTick(this.timerCount);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CountdownModal');
  }

  timerTick(duration: any) {
    setTimeout(() => {
      this.timerCount--;
      this.displayTime = this.getSecondsAsDigitalClock(this.timerCount);
      if (this.timerCount > 0) {
        this.timerTick(this.timerCount);
      } else {
        this.dismiss();
      }
    }, 1000);
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var hoursString = '';
    var minutesString = '';
    var secondsString = '';
    hoursString = (hours < 10) ? "0" + hours : hours.toString();
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString;
  }

  dismiss() {
    this.viewCtrl.dismiss("Start tracking!");
  }

}
