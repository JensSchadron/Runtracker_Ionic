import { Component }      from '@angular/core';

import { NavController }  from 'ionic-angular';

import { TrackingchoicePage } from "../trackingchoice/trackingchoice";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  trackingChoicePage: any = TrackingchoicePage;

  constructor(public navCtrl: NavController) {

  }

}
