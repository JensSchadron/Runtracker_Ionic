import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import {SolotrackingModal} from "../solotracking-modal/solotracking-modal";

/*
  Generated class for the Countdown page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'countdown-modal',
  templateUrl: 'countdown-modal.html'
})
export class CountdownModal {

  timerCount: any;
  showTitle: boolean = true;
  displayTime: any = "00:00:05";
  counting: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController) {
    this.timerCount = navParams.get("timerDuration");
    this.timerTick(this.timerCount);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CountdownModal');
  }

  timerTick(duration: any) {
    if (this.counting ==  true) {
      setTimeout(() => {
        this.timerCount--;
        if (this.timerCount == 2) {
          this.showTitle = false;
          this.displayTime = "Ready?";
          this.timerTick(this.timerCount);
        } else if (this.timerCount == 1) {
          this.showTitle = false;
          this.displayTime = "Set";
          this.timerTick(this.timerCount);
        } else if (this.timerCount == 0) {
          this.displayTime = "Go!";
          this.presentSolotrackingModal();
          this.dismiss();
        } else {
          this.displayTime = this.getSecondsAsDigitalClock(this.timerCount);
          if (this.timerCount > 0) {
            this.timerTick(this.timerCount);
          }
        }
      }, 1000);
    }
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

  addTenSeconds() {
    this.timerCount += 10;
  }

  private presentSolotrackingModal() {
    let solotrackingModal = this.modalCtrl.create(SolotrackingModal, { timerDuration: 10 });
    solotrackingModal.onDidDismiss(message => {
      console.log(message);
    });
    solotrackingModal.present();
  }

  dismiss() {
    this.counting = false;
    this.viewCtrl.dismiss("Start tracking!");
  }

}
