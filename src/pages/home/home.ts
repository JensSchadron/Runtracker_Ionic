import { Component }      from '@angular/core';

import { NavController }  from 'ionic-angular';

import {UserService} from '../../services/auth/user.service';
import {User} from "../../app/model/user";

import { TrackingchoicePage } from "../tracking-choice/tracking-choice";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [UserService]
})
export class HomePage {
  private user;
  private competitionsDone;
  trackingChoicePage: any = TrackingchoicePage;

  ngOnInit(): void {
    this.user = this.userService.getUser().subscribe((user: User) => this.user = user);
    this.competitionsDone = this.user.trackings;
  }

  constructor(public navCtrl: NavController, private userService: UserService) {

  }

}
