import {Component, OnInit} from '@angular/core';
import {App, Events} from 'ionic-angular';
import {NavController}  from 'ionic-angular';
import {FriendsService} from '../../../services/friends/friends.service';
import {User} from "../../../model/user";
import {AddFriendsPage} from "../add-friends/addfriends"


@Component({
    selector: 'page-friendrequests',
    templateUrl: 'friendrequests.html',
    providers: [FriendsService]
  }
)
export class FriendsRequestsPage implements OnInit {
  public pageTitle: string = "Friendrequests";

  private potentialFriends: User[] = [];
  private friends: User[] = [];
  private requests: User[] = [];
  queryString: string = "";
  queryStringMyFriends: string = "";
  addFriendsPage: any = AddFriendsPage;

  ngOnInit(): void {
  }

  onClickAddFriend(username): void {
    this.friendsService.addFriend(username).subscribe(val => {
      console.log(val);
      this.events.publish('friendrequest:update');
      this.init();
    }, (err) => {
      console.log(err)
    });
  }

  onClickRemoveFriend(username): void {
    this.friendsService.deleteFriend(username).subscribe(val => {
      console.log(val);
      this.events.publish('friendrequest:update');
      this.init();
    }, (err) => {
      console.log(err);
    });
  }

  onClickAcceptFriend(username): void {
    this.friendsService.acceptFriend(username).subscribe(val => {
      console.log(val);
      this.events.publish('friendrequest:update');
      this.init();
    }, (err) => {
      console.log(err);
    });
  }

  onAddFriendsBtnClick(): void {
    this.appCtrl.getRootNav().push(this.addFriendsPage).then(() => console.log("Just a console log"));
  }

  constructor(private friendsService: FriendsService, public navCtrl: NavController, public events: Events, public appCtrl: App) {
    this.init();
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
}
