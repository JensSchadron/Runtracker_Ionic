import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the SolotrackingModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'solotracking-modal',
  templateUrl: 'solotracking-modal.html'
})
export class SolotrackingModal {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SolotrackingModalPage');
  }

  dismiss() {
    this.viewCtrl.dismiss("Start tracking!");
  }

}
