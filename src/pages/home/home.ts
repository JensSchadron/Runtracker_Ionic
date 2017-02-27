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
  private competitionsDone;
  private greeting = 'Hello';
  trackingChoicePage: any = TrackingchoicePage;

  ngOnInit(): void {
    this.user = this.editProfileService.getUser().subscribe((user: User) => this.user = user);
    this.competitionsDone = this.user.trackings;
    this.setGreeting();
  }

  setGreeting() {
    let now = new Date();
    if (now.getHours() < 12 && now.getHours() > 7) {
      this.greeting = 'Good morning';
    } else if (now.getHours() >= 12 && now.getHours() < 14) {
      this.greeting = 'Hello';
    } else if (now.getHours() >= 14 && now.getHours() < 19) {
      this.greeting = 'Good afternoon';
    } else if (now.getHours() >= 19 && now.getHours() < 23) {
      this.greeting = 'Good evening';
    } else {
      this.greeting = 'Goodnight';
    }
  }

  constructor(public navCtrl: NavController, private editProfileService: EditProfileService) {

  }

}
