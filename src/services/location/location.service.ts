import { Injectable, NgZone } from '@angular/core';
import { Geolocation, Geoposition } from 'ionic-native';
import 'rxjs/add/operator/filter';
import {Observable, Subject, Subscription} from "rxjs";

@Injectable()
export class LocationService {

  private locationSubcription: Subscription = new Subscription();
  private locationSubject: Subject<Geoposition> = new Subject<Geoposition>();

  constructor(private zone: NgZone) { }

  startTracking() {
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 3000
    };

    this.locationSubcription = Geolocation.watchPosition(options)
      .filter((p) => p.coords !== undefined) //Filter Out Errors
      .subscribe(position => {
        this.zone.run(() => {
          if (position.coords.accuracy <= 100) {
            console.log("LocationService: lat: " + position.coords.latitude + " - lon: " + position.coords.longitude);
            this.locationSubject.next(position);
          }
        });
      });
  }

  receiveLocation(): Observable<Geoposition> {
    return this.locationSubject.asObservable();
  }

  stopTracking() {
    this.locationSubcription.unsubscribe();
    this.locationSubject.unsubscribe();
  }

}
