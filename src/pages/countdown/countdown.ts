import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-countdown',
  templateUrl: 'countdown.html'
})
export class CountdownPage {

  timerCount: any;
  showButtons: boolean;
  pageToPush: any;

  showTitle: boolean = true;
  displayTime: any = "00:00:05";
  counting: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.timerCount = navParams.get("timerDuration");
    this.showButtons = navParams.get("showButtons");
    this.pageToPush = navParams.get("pageToPush");

    // Start the timer.
    this.timerTick(this.timerCount);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CountdownPage');
  }

  timerTick(duration: any) {
    if (this.counting == true) {
      setTimeout(() => {
        this.timerCount--;

        if (this.timerCount > 2) {
          this.displayTime = this.getSecondsAsDigitalClock(this.timerCount);
          this.timerTick(this.timerCount);
        } else if (this.timerCount == 2) {
          this.showTitle = false;
          this.displayTime = "Ready?";
          this.timerTick(this.timerCount);
        } else if (this.timerCount == 1) {
          this.displayTime = "Set";
          this.timerTick(this.timerCount);
        } else if (this.timerCount == 0) {
          this.displayTime = "Go!";
          setTimeout(() => {
            this.pushNextPage();
          }, 1000);
        }

      }, 1000);
    }
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    let sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);
    let hoursString = (hours < 10) ? "0" + hours : hours.toString();
    let minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    let secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString;
  }

  addTenSeconds() {
    this.timerCount += 10;
  }

  cancelTimer() {
    this.counting = false;
  }

  private pushNextPage() {
    this.counting = false;
    this.navCtrl.setRoot(this.pageToPush);
  }

}
