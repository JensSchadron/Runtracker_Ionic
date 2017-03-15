import { CoordinateService } from "./coordinate.service";

let coordinateService = null;

describe('Service: Coordinate', () => {

  beforeEach(() => {
    coordinateService = new CoordinateService();
  });

  it('Should return seconds in a digital format!', () => {
    let zeroSeconds: string = coordinateService.getSecondsAsDigitalClock(0);
    let sixtySeconds: string = coordinateService.getSecondsAsDigitalClock(60);

    expect(zeroSeconds).toEqual('00:00:00');
    expect(sixtySeconds).toEqual('00:01:00');
  });

  it('Should return the distance between two coordinates!', () => {
    let lat1: number = 51.2585048;
    let lng1: number = 4.5517692;
    let lat2: number = 51.2585651;
    let lng2: number = 4.5526432;
    let distanceBetween: number = +coordinateService.calculateDistanceBetweenCoordinates(lat1, lng1, lat2, lng2).toFixed(3);

    expect(distanceBetween).toBe(0.061);
  });

  it('Should return the speed over a distance, given a start and end time!', () => {
    let startTime: number = Date.now().valueOf();
    let endTime: number = Date.now().valueOf() + 1000;
    let distance: number = 0.001;
    let speed: number = coordinateService.calculateSpeed(distance, startTime, endTime);

    expect(speed).toBe(3.6);
  });

  it('Should return the average speed of a collection!', () => {
    let speedStamps: number[] = [1, 2, 3, 4, 5, 6, 7];
    let avgSpeed: number = coordinateService.calculateAvgSpeed(speedStamps);

    expect(avgSpeed).toBe(4);
  });

  it('Should return the average pace of a given average speed!', () => {
    let avgSpeed: number = 6;
    let avgPace: boolean = coordinateService.calculateAvgPace(avgSpeed);
    let avgPaceDigital: string = coordinateService.getSecondsAsDigitalClock(avgPace);

    expect(avgPace).toEqual(600);
    expect(avgPaceDigital).toEqual('00:10:00');
  });

  it('Should return the maximum speed of a collection!', () => {
    let speedStamps: number[] = [2, 2, 3, 4, 5, 5, 6];
    let maxSpeed: number = coordinateService.calculateMaxSpeed(speedStamps);

    expect(maxSpeed).toEqual(6);
  });

});
