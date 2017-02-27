import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SoloLocationPage } from "../solo-location/solo-location";

/*
  Generated class for the Trackingchoice page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-trackingchoice',
  templateUrl: 'tracking-choice.html'
})

export class TrackingchoicePage {
  trackingNotRealtime: any = SoloLocationPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackingchoicePage');
  }

}
