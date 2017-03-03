import { Injectable }   from '@angular/core';

@Injectable()
export class CoordinateService {

  calculateDistanceBetweenCoordinates(lat1, lon1, lat2, lon2): number {
    let pi = 0.017453292519943295;    // Math.PI / 180
    let cosinus = Math.cos;
    let area = 0.5 - cosinus((lat2 - lat1) * pi)/2 + cosinus(lat1 * pi) * cosinus(lat2 * pi) * (1 - cosinus((lon2 - lon1) * pi))/2;

    return 12742 * Math.asin(Math.sqrt(area)); // 2 * R; R = 6371 km
  }

}
