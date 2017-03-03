import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AuthHttpImpl} from "../../services/auth/auth-http-impl";
import {ChallengeLoadPage} from "../challenge-load/challenge-load";
import {Goal} from "../../model/goal";
import {BACKEND_BASEURL} from "../../assets/globals";
import {Response} from "@angular/http";
import {Competition} from "../../model/competition";
import {MQTTService} from "../../services/mqtt/mqtt.service";
import {User} from "../../model/user";
import {UserService} from "../../services/auth/user.service";
import {Observable} from "rxjs";

/*
 Generated class for the ChallengeDistance page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-challenge-distance',
  templateUrl: 'challenge-distance.html'
})
export class ChallengeDistancePage {
  private challengedFriend: User;
  private goals: Goal[];

  private competition: Competition = new Competition();

  constructor(public navCtrl: NavController, public navParams: NavParams, public authHttp: AuthHttpImpl, public mqttService: MQTTService, private userService: UserService) {
    this.challengedFriend = this.navParams.get("friend");
    this.authHttp.getAuthHttp().get(BACKEND_BASEURL + "/api/goals/getGoals")
      .map((res: Response) => res.json())
      .subscribe((goals) => {
        this.goals = goals;
        console.log(goals);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChallengeDistancePage');
  }

  onGoalSelected(goal) {
    this.competition.goal = goal;
    this.competition.name = "Another competition in the database.";

    this.authHttp.getAuthHttp().post(BACKEND_BASEURL + "/api/competitions/createCompetition", this.competition)
      .map((res: Response) => res.json())
      .catch(err => this.handleError(err))
      .subscribe((comp: Competition) => {
        let mqttPayload = {
          compId: comp.competitionId,
          user: comp.userCreated.firstname + " " + comp.userCreated.lastname,
          goal: comp.goal
        };
        this.mqttService.publishInFriendTopic("uid-" + this.challengedFriend.userId, JSON.stringify(mqttPayload));
      });
  }

  private handleError(error: Response | any): Observable<any> {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

}
