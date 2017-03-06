import {Component, OnInit} from "@angular/core";
import {NavController, AlertController, NavParams} from "ionic-angular";


import {UserService} from '../../services/auth/user.service';
import {AuthService} from '../../services/auth/auth.service';
import {FriendProfilePageService} from '../../services/friendsprofile/friend-profilepage.service'
import {User} from "../../model/user";
import {CoreInfo} from "../../model/coreinfo";


/**
 * Created by stijnergeerts on 20/02/17.
 */
@Component({
  selector: 'page-friends-profile',
  templateUrl: 'friends-profile.html',
  providers: [FriendProfilePageService]
})
export class FriendsProfilePage implements OnInit {
  private userFromParam
  private user = new User("","","","");
  private coreInfo;

  ngOnInit(): void {
    this.userFromParam=this.navParams.data;
    let username = this.userFromParam.username;
    this.friendProfilePageService.getUser(username).subscribe((user: User) => {
      this.user = user;
      this.coreInfo = new CoreInfo(this.user);
    }, err => console.error(err));

  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private userService: UserService, private friendProfilePageService: FriendProfilePageService, private auth: AuthService) {

  }

}
