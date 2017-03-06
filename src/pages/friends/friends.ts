import {Component, Inject, OnInit} from '@angular/core';
import {AlertController} from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { NavController }  from 'ionic-angular';
import {FriendsService} from '../../services/friends/friends.service';
import {User} from "../../model/user";

import {FriendsProfilePage} from '../friends-profile/friends-profile'



@Component({
    selector: 'page-friends',
  templateUrl:'friends.html',
  providers: [FriendsService]
}
)
export class FriendsPage implements OnInit{
  private potentialFriends: User[] = [];
  private friends: User[] = [];
  private requests: User[] = [];
  friendsProfilePage = FriendsProfilePage

  queryString: string = "";
  queryStringMyFriends: string = "";





  ngOnInit(): void {
    this.FriendsService.getPotentialFriends().subscribe(
      (users) => {
        this.potentialFriends = users;

      },
      error => {
        console.log(error as string);
      }
    );

    this.FriendsService.getFriends().subscribe(
      (friends) => {
        this.friends = friends;
      },
      error => {
        console.log(error as string);
      }
    );

    this.FriendsService.getFriendrequests().subscribe(
      (friends) => {
        this.requests = friends;
      },
      error => {
        console.log(error as string);
      }
    );
  }

  onClickAddFriend(username): void {
    this.FriendsService.addFriend(username).subscribe(val => console.log(val), err => console.log(err));
    setTimeout(() => this.ngOnInit(), 2000);
  }

  onClickRemoveFriend(username): void {
    this.FriendsService.deleteFriend(username).subscribe(val => console.log(val), err => console.log(err));
    setTimeout(() => this.ngOnInit(), 2000);
  }

  onClickAcceptFriend(username): void {
    this.FriendsService.acceptFriend(username).subscribe(val => console.log(val), err => console.log(err));
    setTimeout(() => this.ngOnInit(), 2000);
  }



  constructor(private FriendsService: FriendsService, public NavCtrl: NavController) {

  }
}


