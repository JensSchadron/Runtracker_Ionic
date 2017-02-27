import {Component} from "@angular/core";
import {NavController, AlertController} from "ionic-angular";
import {EditprofilePage} from '../editprofile/editprofile'

import {UserService} from '../../services/auth/user.service';
import {AuthService} from '../../services/auth/auth.service';
import {User} from "../../app/model/user";

/**
 * Created by stijnergeerts on 20/02/17.
 */
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [UserService]
})
export class ProfilePage {
  private user;
  editProfilePage: any = EditprofilePage;

  ngOnInit(): void {
    this.user = this.userService.getUser().subscribe((user: User) => this.user = user);

  }

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private userService: UserService, private auth: AuthService) {

  }

}
