import {Component, OnInit, OnDestroy} from '@angular/core';
import {App, Events} from 'ionic-angular';
import {NavController}  from 'ionic-angular';

import {FriendsProfilePage} from '../../friends-profile/friends-profile'
import {FriendsService} from "../../../services/friends/friends.service";
import {User} from "../../../model/user";

@Component({
    selector: 'page-friends',
    templateUrl: 'friends.html',
    providers: [FriendsService]
  }
)
export class FriendsPage implements OnInit, OnDestroy {
  public pageTitle: string = "Friends";

  private potentialFriends: User[] = [];
  private friends: User[] = [];
  private requests: User[] = [];
  friendsProfilePage = FriendsProfilePage;
  private friendsLoaded: boolean = false;

  queryString: string = "";
  queryStringMyFriends: string = "";


  ngOnInit(): void {
    this.events.subscribe('friendrequest:update', () => {
      this.init();
    });
  }

  ngOnDestroy(): void {
    this.events.unsubscribe('friendrequest:update');
  }

  onClickAddFriend(username): void {
    this.friendsService.addFriend(username).subscribe(val => {
      console.log(val);
      this.init();
    }, err => console.log(err));
  }

  onClickAcceptFriend(username): void {
    this.friendsService.acceptFriend(username).subscribe(val => {
      console.log(val);
      this.init();
    }, err => console.log(err));
  }

  onFriendClick(friend): void {
    this.appCtrl.getRootNav().push(this.friendsProfilePage, friend);
  }

  private init(): void {
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
        this.friendsLoaded=true;
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

  constructor(private friendsService: FriendsService, public navCtrl: NavController, public events:Events, public appCtrl: App) {
    this.init();
  }
}
