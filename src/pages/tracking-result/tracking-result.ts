import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HomePage} from "../home/home";
import {Tracking} from "../../model/tracking";
import {CoordinateService} from "../../services/location/coordinate.service";
import {Coordinate} from "../../model/coordinate";

declare let google;

@Component({
  selector: 'page-tracking-result',
  templateUrl: 'tracking-result.html'
})
export class TrackingResultPage {

  @ViewChild('resultmap')
  mapElement: ElementRef;
  map: any;

  trackingResult: Tracking;
  durationDisplay: string;
  distanceDisplay: number;
  avgPaceDisplay: string;
  avgSpeedDisplay: number;
  maxSpeedDisplay: number;
  coordinates: Coordinate[] = [];

  wasCompetition: boolean;
  hasWon: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public coordinateService: CoordinateService) {
    this.trackingResult = this.navParams.get("tracking");
    this.durationDisplay = this.coordinateService.getSecondsAsDigitalClock(this.trackingResult.totalDuration);
    this.distanceDisplay = +(this.trackingResult.totalDistance / 1000).toFixed(3);
    this.avgPaceDisplay = this.coordinateService.getSecondsAsDigitalClock(this.trackingResult.avgPace);
    this.avgSpeedDisplay = +this.trackingResult.avgSpeed.toFixed(2);
    this.maxSpeedDisplay = +this.trackingResult.maxSpeed.toFixed(2);
    this.coordinates = this.trackingResult.coordinates;
    this.wasCompetition = this.navParams.get("wasCompetition");
    this.hasWon = this.navParams.get("hasWon");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackingResultPage');
    this.loadMap();
  }

  private loadMap() {
    let runningCoordinates = this.fetchCoordinates();

    let runningPath = new google.maps.Polyline({
      path: runningCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    let startPosition = new google.maps.LatLng(runningCoordinates[Math.round(runningCoordinates.length/2)].lat, runningCoordinates[Math.round(runningCoordinates.length/2)].lng);

    let mapOptions = {
      center: startPosition,
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

    runningPath.setMap(this.map);
  }

  private fetchCoordinates(): any {
    let runningCoordinates = [];

    if (this.coordinates.length > 0) {
      this.coordinates.forEach((c) => {
        runningCoordinates.push({lat: c.lat, lng: c.lon})
      });
    }

    return runningCoordinates;
  }

  private clearResult() {
    this.navCtrl.setRoot(HomePage);
  }

}
