import {Component, OnInit}      from '@angular/core';
import {NavController, AlertController}  from 'ionic-angular';
import {UserService} from '../../services/auth/user.service';
import {User} from "../../model/user";
import {TrackingchoicePage} from "../tracking-choice/tracking-choice";
import {MQTTService} from "../../services/mqtt/mqtt.service";
import {ConfigService} from "../../services/mqtt/config/config.service";
import {Packet} from 'mqtt';
import {Observable, Subscription} from "rxjs";
import {AuthHttpImpl} from "../../services/auth/auth-http-impl";
import {BACKEND_BASEURL} from "../../assets/globals";
import {Response} from "@angular/http";
import {ChallengeLoadPage} from "../challenge-load/challenge-load";
import {MQTTPacketType, InvitePacket, InviteResponsePacket} from "../../services/mqtt/packet/mqtt.packet";
import {TransportState} from "../../services/mqtt/transport.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [UserService]
})

export class HomePage implements OnInit{
  private user;
  private competitionsDone;
  private greeting = 'Hello';
  trackingChoicePage: any = TrackingchoicePage;

  public userMessages: Subscription;

  ngOnInit(): void {
    this.user = this.userService.getUser().subscribe((user: User) =>{
      this.user = user;
      this.competitionsDone = this.user.trackings;
      this.setGreeting();
    });

    if (this.mqttService.state.getValue() === TransportState.CLOSED){
      this.configService.getConfig().then((config) => {
        this.mqttService.configure(config);
        this.mqttService.try_connect()
          .then(() => {
            this.on_connect()
          })
          .catch(() => {
            this.on_error()
          });
      });
    }
  }

  setGreeting() {
    let now = new Date();
    if (now.getHours() >= 7 && now.getHours() < 12) {
      this.greeting = 'Good morning';
    } else if (now.getHours() >= 12 && now.getHours() < 14) {
      this.greeting = 'Hello';
    } else if (now.getHours() >= 14 && now.getHours() < 19) {
      this.greeting = 'Good afternoon';
    } else if (now.getHours() >= 19 && now.getHours() < 23) {
      this.greeting = 'Good evening';
    } else {
      this.greeting = 'Goodnight';
    }
  }

  constructor(public navCtrl: NavController,
              private authHttp: AuthHttpImpl,
              private userService: UserService,
              public mqttService: MQTTService,
              private configService: ConfigService,
              public alertCtrl: AlertController) {
  }

  /** Callback on_connect to queue */
  public on_connect = () => {

    // Store local reference to Observable
    // for use with template ( | async )
    // Subscribe a function to be run on_next message
    // this.userMessages = this.mqttService.userMessages;
    this.userMessages = this.mqttService.userMessages.subscribe(this.on_next);

    // this.userMessages = this.userMessages.subscribe(this.on_next);
  };

  /** Consume a message from the _mqService */
  public on_next = (message: Packet) => {
    let compInvite: InvitePacket = JSON.parse(message.toString());
    console.log(MQTTPacketType.INVITE);
    console.log(compInvite.type);
    if (compInvite.type === MQTTPacketType.INVITE) {
      console.log("creating invite popup");
      let alert = this.alertCtrl.create({
        title: "New Challenge",
        message: compInvite.username + " challenges you to a new competition with a distance of " + compInvite.goal.name,
        buttons: [
          {
            text: "Decline",
            handler: () => {
              this.configService.getConfigWithCompTopic(compInvite.compId).then((config) => {
                this.mqttService.disconnect().then(() => {
                  this.userMessages.unsubscribe();
                  this.mqttService.configure(config);
                  this.mqttService.try_connect()
                    .then(() => {
                      this.on_connect();
                      let response = new InviteResponsePacket(compInvite.compId, this.user.userId, false);
                      this.mqttService.publishInCompTopic(JSON.stringify(response), 2);
                      this.configService.getConfig().then((config) => {
                        this.mqttService.disconnect().then(() => {
                          this.userMessages.unsubscribe();
                          this.mqttService.configure(config);
                          this.mqttService.try_connect()
                            .then(() => {
                              this.on_connect();
                            })
                            .catch(() => {
                              this.on_error();
                            });
                        })
                      }).catch(() => {
                        this.on_error();
                      });
                    }).catch(() => {
                    this.on_error();
                  });
                }).catch(() => {
                  this.on_error();
                });
              }).catch(() => {
                this.on_error();
              });
            }
          },
          {
            text: "Accept",
            handler: () => {
              this.authHttp.getAuthHttp().post(BACKEND_BASEURL + "/api/competitions/running/" + compInvite.compId, null)
                .catch(err => this.handleError(err))
                .subscribe(() => {
                  this.configService.getConfigWithCompTopic(compInvite.compId).then((config) => {
                    this.mqttService.disconnect().then(() => {
                      this.userMessages.unsubscribe();
                      this.mqttService.configure(config);
                      this.mqttService.try_connect()
                        .then(() => {
                          this.on_connect();
                          let response = new InviteResponsePacket(compInvite.compId, this.user.userId, true);
                          this.mqttService.publishInCompTopic(JSON.stringify(response), 2);
                          this.navCtrl.push(ChallengeLoadPage, {compId: compInvite.compId});
                        })
                        .catch(() => {
                          this.on_error();
                        });
                    }).catch(() => {
                      this.on_error();
                    });
                  }).catch(() => {
                    this.on_error();
                  });
                });
            }
          }
        ]
      });
      alert.present();
    }
    // Store message in "historic messages" queue
    console.log(message.toString() + '\n');
  };

  public on_error = () => {
    console.error('Ooops, error in HomePage');
  };

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
