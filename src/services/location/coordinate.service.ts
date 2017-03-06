import { Injectable }   from '@angular/core';

@Injectable()
export class CoordinateService {

  public getSecondsAsDigitalClock(inputSeconds: number): string {
    let sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);
    let hoursString = (hours < 10) ? "0" + hours : hours.toString();
    let minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    let secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString;
  }

  public calculateDistanceBetweenCoordinates(lat1, lon1, lat2, lon2): number {
    let pi = 0.017453292519943295;    // Math.PI / 180
    let cosinus = Math.cos;
    let area = 0.5 - cosinus((lat2 - lat1) * pi)/2 + cosinus(lat1 * pi) * cosinus(lat2 * pi) * (1 - cosinus((lon2 - lon1) * pi))/2;

    return 12742 * Math.asin(Math.sqrt(area)); // 2 * R; R = 6371 km
  }

  public calculateSpeed(distance, prevTime, currentTime): number {
    let secondsBetween: number = (currentTime - prevTime) / 1000;
    let speed = (distance / secondsBetween) * 3600;

    console.log("calculateSpeed: secondsBetween: " + secondsBetween + " - speed: " + speed);
    return speed;
  }

  public calculateAvgSpeed(speedCollection): number {
    let sum = speedCollection.reduce(function (a, b) {
      return a + b;
    });
    return sum / speedCollection.length;
  }

  public calculateAvgPace(avgSpeed): number {
    if (avgSpeed > 0) {
      let avgPace = +((60 / avgSpeed) * 60).toFixed();
      console.log(typeof avgPace + " - " + avgPace);
      return avgPace;
    } else {
      console.log("avgSpeed is zero");
      return 0;
    }
  }

}
