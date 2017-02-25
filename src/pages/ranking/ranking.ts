import {Component, Inject, OnInit} from '@angular/core';
import {AlertController} from 'ionic-angular';
import {RankingService} from "../../services/ranking/ranking.service";
import {User} from "../../app/model/user";

@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.html',
  providers: [RankingService]
})
export class RankingPage implements OnInit{
  private users: User[];
  private orderOption = 1;
  private friends: boolean;

  constructor(private rankingService:RankingService) {
  }

  ngOnInit(): void {
    this.friends = false;
  }

  onChangeOrder(option):void{
    (this.friends)?this.getFriends(option):this.getUsers(option);
  }

  getFriends(option):void{
    this.friends = true;
    this.rankingService.getFriends(option).subscribe(
      (users) => {
        this.users = users;
      },
      error => {
        console.log(error as string);
      }
    );
  }

  getUsers(option):void{
    this.friends = false;
    this.rankingService.getUsers(option).subscribe(
      (users) => {
        this.users = users;
      },
      error => {
        console.log(error as string);
      }
    );
  }
}
