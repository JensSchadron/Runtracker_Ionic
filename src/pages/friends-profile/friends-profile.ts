import {Component, OnInit} from "@angular/core";
import {NavController, NavParams, Events, AlertController} from "ionic-angular";


import {FriendProfilePageService} from '../../services/friendsprofile/friend-profilepage.service'
import {User} from "../../model/user";
import {CoreInfo} from "../../model/coreinfo";
import {FriendsService} from "../../services/friends/friends.service";


/**
 * Created by stijnergeerts on 20/02/17.
 */
@Component({
  selector: 'page-friends-profile',
  templateUrl: 'friends-profile.html',
  providers: [FriendProfilePageService, FriendsService]
})
export class FriendsProfilePage implements OnInit {
  private userFromParam;
  private user = new User("", "", "", "");
  private coreInfo;

  ngOnInit(): void {
    this.userFromParam = this.navParams.data;
    let username = this.userFromParam.username;
    this.friendProfilePageService.getUser(username).subscribe((user: User) => {
      this.user = user;
      this.coreInfo = new CoreInfo(this.user);
    }, err => console.error(err));

  }

  onClickRemoveFriend(username): void {
    this.confirmDelete(username);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events,
              private friendProfilePageService: FriendProfilePageService, private friendsService: FriendsService, private alertCtrl:AlertController) {

  }

  private confirmDelete(username) {
    let alert = this.alertCtrl.create({
      title: 'Delete friend',
      message: 'Are you sure you want to delete ' + username + '?',
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
              this.events.publish('friendrequest:update');
            }, err => console.log(err));
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

}
