import {Goal} from "./goal";
import {User} from "./user";
import {Tracking} from "./tracking";
export class Competition{
 competitionId:number;
 competitionType:string;
 deadline:Date;
 maxParticipants:number;
 goal:Goal;
 userCreated:User;
 userWon:User;
 trackings:Tracking[];
 usersRun:User[];
  finished:boolean;
}
