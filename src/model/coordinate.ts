export class Coordinate{
  time:number;
  lat:number;
  lon:number;
  trackingId:number;
  speed:number;

  constructor(lat?: number, lon?: number, speed?: number) {
    this.lat = lat;
    this.lon = lon;
    this.speed = speed;
    this.time = Date.now().valueOf();
  }
}
