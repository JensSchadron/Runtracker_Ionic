import {Component} from "@angular/core";
import {NavController, AlertController} from "ionic-angular";
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
    this.user = this.userService.getUser().subscribe((user: User) =>{
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
      }else if(user.username.indexOf(".") >= 0) {
        this.errorMsg = "Username may not contain \".\"."
        let alert = this.alerCtrl.create({
          title: 'Username may not contain \".\"',
          message: 'Choose another username',
          buttons: ['Ok']
        });
        alert.present()
      }
      else {
        this.errorMsg = "Username not available. Please choose another username."
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


  constructor(public navCtrl: NavController, private userService: UserService, private friendProfilePageService: FriendProfilePageService, private alerCtrl: AlertController) {

  }



}
