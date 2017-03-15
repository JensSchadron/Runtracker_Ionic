import {Component, ViewChild, ElementRef, NgZone} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {GeocodingService} from "../../services/location/geocoding.service";
import {CountdownPage} from "../countdown/countdown";
import {SolotrackingPage} from "../solo-tracking/solo-tracking";

declare let google;

@Component({
  selector: 'page-tracking-not-realtime',
  templateUrl: 'solo-location.html'
})

export class SoloLocationPage {

  @ViewChild('map')
  mapElement: ElementRef;
  map: any;
  currentLocation: any;

  countdownSoloPage: Component;
  params: any;

  constructor(private geocodingservice: GeocodingService,
              private zone: NgZone,
              public navCtrl: NavController,
              public navParams: NavParams) {
    this.countdownSoloPage = CountdownPage;
    this.params = { timerDuration: 5, showButtons: true, pageToPush: SolotrackingPage}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SoloLocationPage');
    this.loadMap();
  }

  private loadMap() {
    Geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      this.geocodingservice.geocode(latLng).subscribe((results) => {
        let fullAddress = results[0].formatted_address.toString();

        // Oplossing voor het probleem dat currentLocation zich niet in de ngZone bevindt.
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

  private addMarker() {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
  }

}
