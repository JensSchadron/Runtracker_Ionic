import {Component} from "@angular/core";
import {NavController, AlertController, ModalController, ViewController, NavParams, Platform} from "ionic-angular";
import {User} from "../../model/user";
import {UserService} from "../../services/auth/user.service";
import {AuthService} from "../../services/auth/auth.service";
import {FriendProfilePageService} from "../../services/friendsprofile/friend-profilepage.service";
import {CoreInfo} from "../../model/coreinfo";
/**
 * Created by stijnergeerts on 21/02/17.
 */


@Component({
  selector: 'page-editprofile',
  providers: [FriendProfilePageService],
  templateUrl: 'editprofile.html'
})
export class EditprofilePage {
  private user;
  private coreInfo;
  private errorMsg;
  private available: boolean;


  ngOnInit(): void {
    this.user = this.userService.getUser().subscribe((user: User) => {
      this.user = user;
      this.coreInfo = new CoreInfo(this.user);
    }), err => console.error(err);
    this.onUsernameChange(this.user.username);


  }


  onUsernameChange(event): void {
    if (this.user.username == "" || !this.available || this.user.username.indexOf('.') >= 0)
      if (this.user.username == "") {
        this.errorMsg = "Username can not be empty. Please enter a valid username."
      } else {
        this.userService.checkUsernameAvailable(this.user.username).subscribe((val: boolean) => {
            this.available = val;
            if (!val) {
              this.errorMsg = "Username not available. Please choose another username."
              let alert = this.alerCtrl.create({
                title: 'Username already taken!',
                message: 'Choose another username',
                buttons: ['Ok']
              });
              alert.present()

            } else {
              this.errorMsg = "";
            }
          }, err => console.log(err)
        );
      }
  }

  onClickUpdateUser(user: User): void {
    if (user.username == "" || !this.available) {
      if (user.username == "") {
        this.errorMsg = "Username can't be empty. Please choose a valid username."
        let alert = this.alerCtrl.create({
          title: 'Username can not be empty!',
          message: 'Choose a valid username',
          buttons: ['Ok']
        });
        alert.present()
      } else if (user.username.indexOf(".") >= 0) {
        this.errorMsg = "Username may not contain \".\"."
        let alert = this.alerCtrl.create({
          title: 'Username may not contain \".\"',
          message: 'Choose another username',
          buttons: ['Ok']
        });
        alert.present()
      }
      else {
        this.errorMsg = "Username not available. Please choose another username.";
        let alert = this.alerCtrl.create({
          title: 'Username already taken!',
          message: 'Choose another username',
          buttons: ['Ok']
        });
        alert.present()
      }
    }
    else {
      this.user = this.userService.updateUser(user).subscribe((user: User) => this.user = user);
    }
  }

  openModal() {
    let modal = this.modalCtrl.create(AvatarModalPage, this.user);
    modal.present();
  }


  constructor(public navCtrl: NavController, private userService: UserService, private friendProfilePageService: FriendProfilePageService, private alerCtrl: AlertController, public modalCtrl: ModalController) {

  }
}
@Component({
  template: `
<ion-header>
  <ion-toolbar>
  <ion-title>
  Change avatar
  </ion-title>
  <ion-buttons start>
<button ion-button (click)="dismiss()">
  <span ion-text color="primary" showWhen="ios">Cancel</span>
  <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
  </button>
  </ion-buttons>
  </ion-toolbar>
  </ion-header>
  <ion-content>
  <ion-card>
  <ion-card-title>Choose your favourite avatar!</ion-card-title>
  <ion-grid>
        <ion-row>
          <ion-col width-25>      
          <img class="avatareke" [src]="'assets/img/avatars/black.png'" (click)="setAvatar('black')">
          </ion-col>
          <ion-col width-25>      
          <img class="avatareke" [src]="'assets/img/avatars/blond.png'" (click)="setAvatar('blond')">
          </ion-col>
          <ion-col width-25>      
          <img class="avatareke" [src]="'assets/img/avatars/cat.png'" (click)="setAvatar('cat')">
          </ion-col>
          <ion-col width-25>      
          <img class="avatareke" [src]="'assets/img/avatars/cool-guy.png'" (click)="setAvatar('cool-guy')">
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col width-25>      
          <img class="avatareke" [src]="'assets/img/avatars/dog.png'" (click)="setAvatar('dog')">
          </ion-col>
          <ion-col width-25>      
          <img class="avatareke" [src]="'assets/img/avatars/girl.png'" (click)="setAvatar('girl')">
          </ion-col>
          <ion-col width-25>      
          <img class="avatareke" [src]="'assets/img/avatars/naruto.png'" (click)="setAvatar('naruto')">
          </ion-col>
          <ion-col width-25>      
          <img class="avatareke" [src]="'assets/img/avatars/nerd.png'" (click)="setAvatar('nerd')">
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col width-25>      
          <img class="avatareke" [src]="'assets/img/avatars/robot.png'" (click)="setAvatar('robot')">
          </ion-col>
          <ion-col width-25>      
          <img class="avatareke" [src]="'assets/img/avatars/skater-girl.png'" (click)="setAvatar('skater-girl')">
          </ion-col>
          <ion-col width-25>      
          <img class="avatareke" [src]="'assets/img/avatars/strong.png'" (click)="setAvatar('strong')">
          </ion-col>
          <ion-col width-25>      
          <img class="avatareke" [src]="'assets/img/avatars/war-girl.png'" (click)="setAvatar('war-girl')">
          </ion-col>
        </ion-row>
      </ion-grid>
      </ion-card>
</ion-content>
   `,
  selector: 'modal-avatar'


})
export class AvatarModalPage {
  private user;

  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController, private userService: UserService) {
    this.user = this.params.data;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  setAvatar(avatar: string) {
    this.user.avatar = avatar;
    this.user = this.userService.updateUser(this.user).subscribe((user: User) => this.user = user);
    this.viewCtrl.dismiss();
  }
}
