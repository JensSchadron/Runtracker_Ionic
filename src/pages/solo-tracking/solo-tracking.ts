import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-solotracking',
  templateUrl: 'solo-tracking.html'
})
export class SolotrackingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SolotrackingPage');
  }

  stopTracking(): void {

  }

}
