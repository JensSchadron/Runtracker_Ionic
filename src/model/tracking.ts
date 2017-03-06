import {Coordinate} from "./coordinate";
import {Competition} from "./competition";
export class Tracking{
  totalDuration:number;
  totalDistance:number;
  maxSpeed:number;
  avgSpeed:number;
  avgPace:number;
  competition:Competition;
  coordinates:Coordinate[];
}
