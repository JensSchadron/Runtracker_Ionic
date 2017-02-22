import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TrackingNotRealtimePage } from "../tracking-not-realtime/tracking-not-realtime";
import { TrackinggoalPage } from '../trackinggoal/trackinggoal';

/*
  Generated class for the Trackingchoice page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-trackingchoice',
  templateUrl: 'trackingchoice.html'
})

export class TrackingchoicePage {
  trackingNotRealtime: any = TrackingNotRealtimePage;
  trackingGoalPage: any = TrackinggoalPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackingchoicePage');
  }

}
