import {Component, OnInit} from '@angular/core';
import {App, Events, ToastController, AlertController} from 'ionic-angular';
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
  public pageTitle:string = "Friendrequests";

  private potentialFriends:User[] = [];
  private friends:User[] = [];
  private requests:User[] = [];
  private requestsLoaded:boolean = false;
  queryString:string = "";
  queryStringMyFriends:string = "";
  addFriendsPage:any = AddFriendsPage;

  ngOnInit():void {
  }

  constructor(private friendsService:FriendsService, public navCtrl:NavController, public events:Events, public appCtrl:App, private toastCtrl:ToastController, private alertCtrl:AlertController) {
    this.init();
  }

  private init():void {
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
        this.requestsLoaded = true;
      },
      error => {
        console.log(error as string);
      }
    );
  }

  onClickAddFriend(username):void {
    this.friendsService.addFriend(username).subscribe(val => {
      console.log(val);
      this.events.publish('friendrequest:update');
      this.init();
    }, (err) => {
      console.log(err)
    });
  }

  onClickRemoveFriend(username):void {
    this.confirmDelete(username);

  }

  onClickAcceptFriend(username):void {
    this.friendsService.acceptFriend(username).subscribe(val => {
      console.log(val);
      this.events.publish('friendrequest:update');
      this.presentToast(username);
      this.init();
    }, (err) => {
      console.log(err);
    });
  }

  onAddFriendsBtnClick():void {
    this.appCtrl.getRootNav().push(this.addFriendsPage).then(() => console.log("Just a console log"));
  }

  presentToast(username) {
    let toast = this.toastCtrl.create({
      message: username + ' was added successfully!',
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }

  doRefresh(refresher) {
    this.init();
    refresher.complete();
  }

  confirmDelete(username) {
    let alert = this.alertCtrl.create({
      title: 'Delete friend',
      message: 'Are you sure you want to deny ' + username + '?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.friendsService.deleteFriend(username).subscribe(val => {
              console.log(val);
              this.events.publish('friendrequest:update');
              this.init();
            }, (err) => {
              console.log(err);
            });
          }
        }
      ]
    });
    alert.present();
  }
}
