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
  private orderOption;
  private friends: boolean;
  private btnWorld;
  private btnFriends;

  constructor(private rankingService:RankingService) {
  }

  ngOnInit(): void {
    this.friends = false;
    this.btnWorld = document.getElementById('button-world');
    this.btnFriends = document.getElementById('button-friends');
    RankingPage.setButtonActive(this.btnWorld)
    this.orderOption = 1;
    this.getUsers(this.orderOption);
  }

  onChangeOrder(option):void{
    (this.friends)?this.getFriends(option):this.getUsers(option);
  }

  getFriends(option):void{
    RankingPage.setButtonPassive(this.btnWorld);
    RankingPage.setButtonActive(this.btnFriends);
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
    console.log(this.orderOption);
    RankingPage.setButtonPassive(this.btnFriends);
    RankingPage.setButtonActive(this.btnWorld);
    this.friends = false;
    this.rankingService.getUsers(option).subscribe(
      (users) => {
        this.users = users;
        console.log(users);
      },
      error => {
        console.log(error as string);
      }
    );
  }

  static setButtonActive(button):void{
    button.classList.remove('btn-passive');
    button.classList.add('btn-active');
  };

  static setButtonPassive(button):void{
    button.classList.remove('btn-active');
    button.classList.add('btn-passive');
  };
}
