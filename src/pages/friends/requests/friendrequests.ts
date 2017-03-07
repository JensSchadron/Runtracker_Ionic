import {Component, Inject, OnInit} from '@angular/core';
import {AlertController, App} from 'ionic-angular';
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
  public pageTitle: string = "Friendrequests";

  private potentialFriends: User[] = [];
  private friends: User[] = [];
  private requests: User[] = [];
  queryString: string = "";
  queryStringMyFriends: string = "";
  addFriendsPage: any = AddFriendsPage;





  ngOnInit(): void {
    this.friendsService.getPotentialFriends().subscribe(
      (users) => {
        this.potentialFriends = users;
      },
      error => {
        console.log(error as string);
      }
    );

    this.friendsService.getFriends().subscribe(
      (friends) => {
        this.friends = friends;
      },
      error => {
        console.log(error as string);
      }
    );

    this.friendsService.getFriendrequests().subscribe(
      (friends) => {
        this.requests = friends;
      },
      error => {
        console.log(error as string);
      }
    );
  }

  onClickAddFriend(username): void {
    this.friendsService.addFriend(username).subscribe(val => console.log(val), err => console.log(err));
    setTimeout(() => this.ngOnInit(), 2000);
  }

  onClickRemoveFriend(username): void {
    this.friendsService.deleteFriend(username).subscribe(val => console.log(val), err => console.log(err));
    setTimeout(() => this.ngOnInit(), 2000);
  }

  onClickAcceptFriend(username): void {
    this.friendsService.acceptFriend(username).subscribe(val => console.log(val), err => console.log(err));
    setTimeout(() => this.ngOnInit(), 2000);
  }

  onAddFriendsBtnClick(): void {
    this.appCtrl.getRootNav().push(this.addFriendsPage).then(() => console.log("Just a console log"));
  }

  constructor(private friendsService: FriendsService, public navCtrl: NavController, public appCtrl: App) {
  }

}


