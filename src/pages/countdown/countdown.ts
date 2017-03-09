import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {CoordinateService} from "../../services/location/coordinate.service";
import {ChallengeTrackingPage} from "../challenge-tracking/challenge-tracking";

@Component({
  selector: 'page-countdown',
  templateUrl: 'countdown.html'
})
export class CountdownPage {

  private timerCount: any;
  private showButtons: boolean;
  private pageToPush: any;
  private navParamsChallenge: any;

  private showTitle: boolean = true;
  private displayTime: any;
  private counting: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private coordinateService: CoordinateService) {
    this.timerCount = navParams.get("timerDuration");
    this.showButtons = navParams.get("showButtons");
    this.pageToPush = navParams.get("pageToPush");
    this.navParamsChallenge = navParams.get("navParams");

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
          this.displayTime = this.coordinateService.getSecondsAsDigitalClock(this.timerCount);
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

  addTenSeconds() {
    this.timerCount += 10;
  }

  cancelTimer() {
    this.counting = false;
  }

  private pushNextPage() {
    this.counting = false;
    if (this.pageToPush === ChallengeTrackingPage) {
      this.navCtrl.setRoot(this.pageToPush, this.navParamsChallenge);
    } else {
      this.navCtrl.setRoot(this.pageToPush);
    }
  }

}
