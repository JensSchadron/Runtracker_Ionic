import {Component, OnInit} from '@angular/core';
import {NavController}  from 'ionic-angular';
import {FriendsService} from '../../../services/friends/friends.service';
import {User} from "../../../model/user";



@Component({
    selector: 'page-addfriends',
    templateUrl:'addfriends.html',
    providers: [FriendsService]
  }
)
export class AddFriendsPage implements OnInit {
  private potentialFriends: User[] = [];
  queryString: string = "";
  private friendsLoaded:boolean = false;

  ngOnInit(): void {
    this.FriendsService.getPotentialFriends().subscribe(
      (users) => {
        this.potentialFriends = users;
        this.friendsLoaded=true;
      },
      error => {
        console.log(error as string);
      }
    );
  }

  onClickAddFriend(username): void {
    this.FriendsService.addFriend(username).subscribe(val => {
      console.log(val);
      this.ngOnInit();
    }, err => console.log(err));
  }


  constructor(private FriendsService: FriendsService, public NavCtrl: NavController) {
  }
}
