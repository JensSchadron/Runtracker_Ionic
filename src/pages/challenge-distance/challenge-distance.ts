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
import {ConfigService} from "../../services/mqtt/config/config.service";
import {InvitePacket} from "../../services/mqtt/packet/mqtt.packet";

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
  private loadingPage: any = ChallengeLoadPage;

  private challengedFriend: User;
  private goals: Goal[];

  private competition: Competition = new Competition();

  constructor(public navCtrl: NavController, public navParams: NavParams, public authHttp: AuthHttpImpl, public mqttService: MQTTService, private configService: ConfigService, private userService: UserService) {
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
        this.configService.getConfigWithCompTopic(comp.competitionId).then((config) => {
          this.mqttService.disconnect().then(() => {
            this.mqttService.configure(config);
            this.mqttService.try_connect()
              .then(() => {
                let mqttPayload = new InvitePacket(comp.competitionId, comp.userCreated.firstname + " " + comp.userCreated.lastname, comp.goal);
                this.mqttService.publishInFriendTopic(this.challengedFriend.userId, JSON.stringify(mqttPayload));

                this.navCtrl.push(this.loadingPage, {
                  compId: comp.competitionId,
                  goalDistance: comp.goal.distance
                });
              });
          });
        });
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
