import { Component }      from '@angular/core';

import { NavController }  from 'ionic-angular';

import {UserService} from '../../services/auth/user.service';
import {User} from "../../model/user";

import { TrackingchoicePage } from "../tracking-choice/tracking-choice";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [UserService]
})
export class HomePage {
  private user;
  private competitionsDone;
  private greeting = 'Hello';
  trackingChoicePage: any = TrackingchoicePage;

  ngOnInit(): void {
    this.user = this.userService.getUser().subscribe((user: User) => this.user = user);
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

  constructor(public navCtrl: NavController, private userService: UserService) {

  }

}
