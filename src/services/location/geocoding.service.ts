import { Injectable } from '@angular/core';
import { Observer }   from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

declare let google;

@Injectable()
export class GeocodingService {

  geocoder: any = new google.maps.Geocoder();

  constructor() {
    this.geocoder = new google.maps.Geocoder();
  }

  /**
   * Reverse geocoding by location.
   * Wraps the Google Maps API geocoding service into an observable.
   *
   * @param latLng Location
   * @return An observable of GeocoderResult
   */
  geocode(latLng: any): Observable<any> {
    return new Observable((observer: Observer<any>) => {

      this.geocoder.geocode({'location': latLng}, (
        (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            observer.next(results);
            observer.complete();
          } else {
            console.log('Geocoding service: geocoder failed due to: ' + status);
            observer.error(status);
          }
        })
      );

    });
  }

}
