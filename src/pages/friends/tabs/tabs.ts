import {Component, OnInit, ViewChild} from '@angular/core';

import {FriendsPage} from '../../friends/friends';
import {FriendsRequestsPage} from '../requests/friendrequests';
import {FriendsService} from '../../../services/friends/friends.service';
import {User} from "../../../model/user";
import {NavController, Tabs, Events} from "ionic-angular";

@Component({
  templateUrl: 'tabs.html',
  providers: [FriendsService]
})
export class TabsPage implements OnInit {
  @ViewChild('tabs') tabRef: Tabs;

  // this tells the tabs component which Pages
  // should be each tab's root Page
  friendsPage: any = FriendsPage;
  friendRequestsPage: any = FriendsRequestsPage;
  private requests: User[];


  ngOnInit(): void {
    this.events.subscribe('friendrequest:update', () => {
      console.log('event received :3');
      this.updateFriendRequests();
    });
  }

  constructor(private FriendsService: FriendsService, public NavCtrl: NavController, public events: Events) {
    this.updateFriendRequests();
  }

  private updateFriendRequests(): void {
    this.FriendsService.getFriendrequests().subscribe(
      (friends) => {
        this.requests = friends;

      },
      error => {
        console.log(error as string);
      }
    );
  }
}
