import {Component, Inject, OnInit} from '@angular/core';
import {AlertController} from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { NavController }  from 'ionic-angular';
import {FriendsService} from '../../../services/friends/friends.service';
import {User} from "../../../model/user";



@Component({
    selector: 'page-addfriends',
    templateUrl:'addfriends.html',
    providers: [FriendsService]
  }
)
export class AddFriendsPage implements OnInit{
  private potentialFriends: User[] = [];
  queryString: string = "";

  ngOnInit(): void {
    this.FriendsService.getPotentialFriends().subscribe(
      (users) => {
        this.potentialFriends = users;
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


  constructor(private FriendsService: FriendsService, public NavCtrl: NavController) {

  }

}


