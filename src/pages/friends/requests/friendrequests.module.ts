import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {FriendsService} from "../../../services/friends/friends.service";
import {SearchPipe} from "../searchpipe";

@NgModule({
  imports: [CommonModule, FormsModule],
  providers: [FriendsService],
  declarations: [SearchPipe],
})

export class FriendsModule {

}
