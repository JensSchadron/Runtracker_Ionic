import {Component} from "@angular/core";
import {NavController, AlertController} from "ionic-angular";
import {EditprofilePage} from '../editprofile/editprofile'

import {EditProfileService} from '../editprofile/editprofile.service';
import {AuthService} from '../../services/auth/auth.service';
import {User} from "../../app/model/user";

/**
 * Created by stijnergeerts on 20/02/17.
 */
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [EditProfileService]
})
export class ProfilePage {
  private user;
  editProfilePage: any = EditprofilePage;

  ngOnInit(): void {
    this.user = this.editProfileService.getUser().subscribe((user: User) => this.user = user);

  }

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private editProfileService: EditProfileService, private auth: AuthService) {

  }

}
