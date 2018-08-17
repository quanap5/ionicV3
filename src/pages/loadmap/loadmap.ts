import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
//import { googlemaps } from 'googlemaps';

//import { GoogleMaps } from '@ionic-native/google-maps';

/**
 * Generated class for the LoadmapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google

@IonicPage()
@Component({
  selector: 'page-loadmap',
  templateUrl: 'loadmap.html',
})
export class LoadmapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  latLng: any;
  markers: any;
  mapOptions: any;
  isKm: any = 500;
  isType: any = "";



  constructor(public navCtrl: NavController, public navParams: NavParams, private ngZone: NgZone,
    private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoadmapPage');
    this.loadMap3();
    
  }

  /* function for loadding map in version 1*/

  loadMap() {

    this.latLng = new google.maps.LatLng('37.5665', '126.9780');

    let mapOptions = {
      center: this.latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker(this.latLng, this.map);
  }

  loadMap3(){
    this.geolocation.getCurrentPosition().then((position) => {
this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          console.log('latLng',this.latLng);
     
      this.mapOptions = {
        center: this.latLng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }   
this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
this.addMarker(this.latLng, this.map);
    }, (err) => {
      alert('err '+err);
    });
  }

  /*Get GPS */

  getGPS() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latLng.latitude = resp.coords.latitude;
      this.latLng.longtitude = resp.coords.longitude;
      // this.profile.latitude = resp.coords.latitude;
      // this.profile.longtitude = resp.coords.longitude;
      //console.log(this.profile.longtitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  /* function for loadding map in version 2*/

  loadMap2() {
    this.geolocation.getCurrentPosition().then((position) => {
      this.latLng = new google.maps.latLng(position.coords.latitude, position.coords.longitude);
      console.log('latLng', this.latLng);

      this.mapOptions = {
        center: this.latLng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
    });


  }

  /* function for finding nearby location in version 2*/
  nearbyPlace() {
    //this.loadMap3();
    this.markers = [];
    let service = new google.maps.places.PlacesService(this.map);
    service.nearbySearch({
      location: this.latLng,
      radius: this.isKm,
      types: [this.isType]
    }, (results, status) => {
      this.callback(results, status);
    });
  }
  callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        this.createMarker(results[i]);
      }
    }
  }
  createMarker(place) {
    var placeLoc = place;
    console.log('placeLoc', placeLoc);
    this.markers = new google.maps.Marker({
      map: this.map,
      position: place.geometry.location
    });
    let infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(this.markers, 'click', () => {
      this.ngZone.run(() => {
        infowindow.setContent(place.name);
        infowindow.open(this.map, this.markers);
      });
    });
  }

  /** function use to add maker on google map */

  addMarker(position, map) {
    return new google.maps.Marker({ position, map });
  }

}
