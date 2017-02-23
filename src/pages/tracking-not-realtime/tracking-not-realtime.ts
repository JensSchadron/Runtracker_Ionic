import {Component, ViewChild, ElementRef, OnChanges, SimpleChanges, NgZone} from '@angular/core';
import {NavController, NavParams, LoadingController, ModalController} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {CountdownModal} from "../countdown-modal/countdown-modal";
import {Observable, Observer} from "rxjs";

declare var google;

/*
 Generated class for the TrackingNotRealtime page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-tracking-not-realtime',
  templateUrl: 'tracking-not-realtime.html'
})

export class TrackingNotRealtimePage implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    console.log("onChanges");
    console.log(changes);
  }

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  geocoder: any;
  currentLocation: any = "\n";

  constructor(private zone: NgZone,
              public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController) {

    this.geocoder = new google.maps.Geocoder();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackingNotRealtimePage');
    this.loadMap();
  }

  loadMap() {
    Geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      this.geocode(latLng).subscribe((results) => {
        // alert(results[0].formatted_address);
        let fullAddress = results[0].formatted_address.toString();
        this.zone.run(() => {
          this.currentLocation = fullAddress.replace(/, België/gi, " ");
        });
      });

      let mapOptions = {
        center: latLng,
        zoom: 17,
        scrollwheel: false,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#444444"}]
        }, {
          "featureType": "administrative.country",
          "elementType": "labels.text",
          "stylers": [{"color": "#003f5f"}]
        }, {
          "featureType": "administrative.province",
          "elementType": "labels.text",
          "stylers": [{"color": "#003f5f"}]
        }, {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#003f5f"}]
        }, {
          "featureType": "administrative.neighborhood",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#003f5f"}]
        }, {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#003f5f"}]
        }, {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [{"color": "#f2f2f2"}]
        }, {
          "featureType": "landscape",
          "elementType": "geometry.fill",
          "stylers": [{"color": "#c1b8af"}, {"lightness": "69"}]
        }, {
          "featureType": "landscape.man_made",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#003f5f"}]
        }, {
          "featureType": "landscape.natural.landcover",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#003f5f"}]
        }, {
          "featureType": "landscape.natural.terrain",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#003f5f"}]
        }, {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [{"visibility": "off"}]
        }, {
          "featureType": "poi.attraction",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#003f5f"}]
        }, {
          "featureType": "poi.business",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#003f5f"}]
        }, {
          "featureType": "poi.government",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#003f5f"}]
        }, {
          "featureType": "poi.medical",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#003f5f"}]
        }, {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [{"color": "#978b82"}]
        }, {
          "featureType": "poi.park",
          "elementType": "labels.text",
          "stylers": [{"color": "#003f5f"}]
        }, {
          "featureType": "poi.place_of_worship",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#003f5f"}]
        }, {
          "featureType": "poi.school",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#003f5f"}]
        }, {
          "featureType": "poi.sports_complex",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#003f5f"}]
        }, {
          "featureType": "road",
          "elementType": "all",
          "stylers": [{"saturation": -100}, {"lightness": 45}]
        }, {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [{"visibility": "simplified"}]
        }, {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#003f5f"}]
        }, {
          "featureType": "road.highway.controlled_access",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#003f5f"}]
        }, {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#003f5f"}]
        }, {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
          "stylers": [{"visibility": "off"}]
        }, {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#438fb6"}, {"lightness": "0"}, {"gamma": "0"}, {"saturation": "0"}]
        }, {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [{"visibility": "off"}]
        }, {
          "featureType": "water",
          "elementType": "all",
          "stylers": [{"color": "#328aae"}, {"visibility": "on"}]
        }, {"featureType": "water", "elementType": "geometry.fill", "stylers": [{"color": "#003f5f"}]}]
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker();

    }, (err) => {
      console.log(err);
    });

  }

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

  private addMarker() {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
  }

  private presentCountdownModal() {
    let countdownModal = this.modalCtrl.create(CountdownModal, {timerDuration: 5});
    countdownModal.onDidDismiss(message => {
      console.log(message);
    });
    countdownModal.present();
  }

}
