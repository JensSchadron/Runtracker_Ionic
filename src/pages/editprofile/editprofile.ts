import {Component} from "@angular/core";
import {NavController, AlertController} from "ionic-angular";
import {User} from "../../app/model/user";
import {EditProfileService} from "../../services/user/user.service";
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
  }

  onUsernameChange(event): void {
    if (this.user.username == "" || !this.available || this.user.username.indexOf('.') >= 0) {
      if (this.user.username == "") {
        this.errorMsg = "Username can't be empty. Please choose a valid username."
        let alert = this.alerCtrl.create({
          title: 'Username can not be empty!',
          message: 'Choose a valid username',
          buttons: ['Ok']
        });
        alert.present()
      }else if(this.user.username.indexOf(".") >= 0) {
        this.errorMsg = "Username may not contain \".\"."
        let alert = this.alerCtrl.create({
          title: 'Username may not contain \".\"',
          message: 'Choose another username',
          buttons: ['Ok']
        });
        alert.present()
      }
      else if(!this.available){
        this.errorMsg = "Username not available. Please choose another username."
        let alert = this.alerCtrl.create({
          title: 'Username already taken!',
          message: 'Choose another username',
          buttons: ['Ok']
        });
        alert.present()
      }
    }
  }

  onClickUpdateUser(user: User): void {
    if (user.username == "" || !this.available || user.username.indexOf(".") >= 0) {
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
      this.user = this.editProfileService.updateUser(user).subscribe((user: User) => this.user = user);
    }
  }

  onItemChanged(event): void{

  }


  constructor(public navCtrl: NavController, private editProfileService: EditProfileService, private alerCtrl: AlertController) {

  }




}
