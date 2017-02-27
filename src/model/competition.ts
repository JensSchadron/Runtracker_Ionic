import {Goal} from "./goal";
import {User} from "./user";
import {Tracking} from "./tracking";
export class Competition{
 competitionId:number;
 goal:Goal;
 userCreated:User;
 userWon:User;
 trackings:Tracking[];
 usersRun:User[];
 topic:string;
 name:string;
}
