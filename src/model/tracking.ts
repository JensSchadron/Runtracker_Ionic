import {coordinate} from "./coordinate";
import {Competition} from "./competition";
export class Tracking{
  trackingId:number;
  time:Date;
  totalDuration:number;
  totalDistance:number;
  maxSpeed:number;
  avgSpeed:number;
  competition:Competition;
  coordinates:coordinate[];
}
