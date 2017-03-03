import {Component, Inject, OnInit} from '@angular/core';
import {AlertController} from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { NavController }  from 'ionic-angular';
import {FriendsService} from '../../../services/friends/friends.service';
import {User} from "../../../model/user";
import {AddFriendsPage} from "../addfriends/addfriends"



@Component({
    selector: 'page-friendrequests',
  templateUrl:'friendrequests.html',
  providers: [FriendsService]
}
)
export class FriendsRequestsPage implements OnInit{
  private potentialFriends: User[] = [];
  private friends: User[] = [];
  private requests: User[] = [];
  queryString: string = "";
  queryStringMyFriends: string = "";
  trackingChoicePage: any = AddFriendsPage;





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


