import {Component, OnInit} from "@angular/core";
import {NavController, AlertController, NavParams} from "ionic-angular";


import {UserService} from '../../services/auth/user.service';
import {AuthService} from '../../services/auth/auth.service';
import {FriendProfilePageService} from '../../services/friendsprofile/friend-profilepage.service'
import {User} from "../../model/user";
import {CoreInfo} from "../../model/coreinfo";
import {FriendsService} from "../../services/friends/friends.service";
import {FriendsPage} from "../friends/friends";
import {App} from 'ionic-angular';
import {TabsPage} from "../friends/tabs/tabs";


/**
 * Created by stijnergeerts on 20/02/17.
 */
@Component({
  selector: 'page-friends-profile',
  templateUrl: 'friends-profile.html',
  providers: [FriendProfilePageService,FriendsService]
})
export class FriendsProfilePage implements OnInit {
  private userFromParam;
  private user = new User("","","","");
  private coreInfo;
  private tabsPage = TabsPage;

  ngOnInit(): void {
    this.userFromParam=this.navParams.data;
    let username = this.userFromParam.username;
    this.friendProfilePageService.getUser(username).subscribe((user: User) => {
      this.user = user;
      this.coreInfo = new CoreInfo(this.user);
    }, err => console.error(err));

  }

  onClickRemoveFriend(username): void {
    this.friendsService.deleteFriend(username).subscribe(val => {
      console.log(val);
      this.appCtrl.getRootNav().push(this.tabsPage);
    }, err => console.log(err));
  }

  constructor(public appCtrl: App,public navCtrl: NavController, public navParams: NavParams,
              private friendProfilePageService: FriendProfilePageService, private friendsService: FriendsService) {

  }

}
