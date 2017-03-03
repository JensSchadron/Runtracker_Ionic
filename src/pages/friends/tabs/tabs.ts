import {Component, OnInit} from '@angular/core';

import { FriendsPage } from '../../friends/friends';
import { FriendsRequestsPage } from '../requests/friendrequests';
import {FriendsService} from '../../../services/friends/friends.service';
import {User} from "../../../model/user";
import {NavController} from "ionic-angular";

@Component({
  templateUrl: 'tabs.html',
  providers: [FriendsService]
})
export class TabsPage implements OnInit{

  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = FriendsPage;
  tab2Root: any = FriendsRequestsPage;
  tab3Root: any = FriendsRequestsPage;
  private requests: User[] = [];


  ngOnInit(): void {
    this.FriendsService.getFriendrequests().subscribe(
      (friends) => {
        this.requests = friends;
      },
      error => {
        console.log(error as string);
      }
    );
  }

  constructor(private FriendsService: FriendsService, public NavCtrl: NavController) {

  }
}
