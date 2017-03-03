import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {User} from "../../model/user";
import {AuthHttpImpl} from "../../services/auth/auth-http-impl";
import {Response} from "@angular/http";
import {BACKEND_BASEURL} from "../../assets/globals";
import {ChallengeDistancePage} from "../challenge-distance/challenge-distance";

/*
 Generated class for the ChallengeFriends page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-challenge-friends',
  templateUrl: 'challenge-friends.html'
})
export class ChallengeFriendsPage {
  private challengeDistance: any = ChallengeDistancePage;

  private friends: User[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private authHttp: AuthHttpImpl) {
    this.authHttp.getAuthHttp().get(BACKEND_BASEURL + "/api/users/getAllOnlineFriends")
      .map((res: Response) => res.json())
      .subscribe((users) => {
        this.friends = users;
        console.log(users);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChallengeFriendsPage');
  }

  private onFriendClick(selectedFriend: User) {
    this.navCtrl.push(this.challengeDistance,
      {friend: selectedFriend}
    );
  }

}
