import {Tracking} from "./tracking";
import {Competition} from "./competition";
export class User {
  avgDistance: number;
  avgSpeed: number;
  birthday: Date;
  city: string;
  competitionsCreated: Competition[];
  competitionsRun: Competition[];
  competitionsWon: Competition[];
  firstname: string;
  friends: User[];
  gender: string;
  lastname: string;
  maxDistance: number;
  maxSpeed: number;
  nrOfCompetitionsWon: number;
  ranMarathon: boolean;
  ranTenKm: boolean;
  ranTwentyKm: boolean;
  totalDistance: number;
  trackings: Tracking[];
  userId: number;
  username: string;

  constructor(username: string, firstname: string, lastname: string, gender: string) {
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.gender = gender;
  }
}


