import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {User} from "../../app/model/user";
import {EditProfileService} from "./editprofile.service";
import {AuthService} from "../../services/auth/auth.service";
/**
 * Created by stijnergeerts on 21/02/17.
 */


@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html'
})
export class EditprofilePage {
  private user;
  private errorMsg;
  private available: boolean;


  ngOnInit(): void {
    this.user = this.editProfileService.getUser().subscribe((user: User) => this.user = user);
    this.onUsernameChange(this.user.username);

  }
  onUsernameChange(event): void {
    if (this.user.username == "") {
      this.errorMsg = "Username can not be empty. Please enter a valid username."
    } else {
      this.editProfileService.checkUsernameAvailable(this.user.username).subscribe((val: boolean) => {
          this.available = val;
          if (!val) {
            this.errorMsg = "Username not available. Please choose another username."
          } else {
            this.errorMsg = "";
          }
        }, err => console.log(err)
      );
    }
  }
  onClickUpdateUser(user: User): void {
    if (user.username != "" && this.available) {
      this.errorMsg = "";
      this.user = this.editProfileService.updateUser(user).subscribe((user: User) => this.user = user);
    } else {
      if (user.username == "") {
        this.errorMsg = "Username can not be empty. Please enter a valid username."
      } else {
        this.errorMsg = "Username not available. Please choose another username."
      }
    }
  }

  constructor(public navCtrl: NavController, private editProfileService: EditProfileService) {

  }

}
