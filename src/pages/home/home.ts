import { Component }      from '@angular/core';

import { NavController }  from 'ionic-angular';

import {EditProfileService} from '../../services/user/user.service';
import {User} from "../../app/model/user";

import { TrackingchoicePage } from "../trackingchoice/trackingchoice";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [EditProfileService]
})
export class HomePage {
  private user;
  trackingChoicePage: any = TrackingchoicePage;

  ngOnInit(): void {
    this.user = this.editProfileService.getUser().subscribe((user: User) => this.user = user);

  }

  constructor(public navCtrl: NavController, private editProfileService: EditProfileService) {

  }

}
