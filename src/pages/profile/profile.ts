import {Component} from "@angular/core";
import {NavController, AlertController} from "ionic-angular";
/**
 * Created by stijnergeerts on 20/02/17.
 */
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {

  }


}
