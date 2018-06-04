import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation'

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
    this.loadMap();
  }

  /* function for loadding map in version 1*/

  loadMap() {

    let latLng = new google.maps.LatLng('37.663998', '127.978458');

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker(latLng, this.map);
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
    }, (err) => {
      alert('err ' + err);


    });


  }

  /* function for finding nearby location in version 2*/
  nearbyPlace(){
      
  }

  /** function use to add maker on google map */

  addMarker(position, map) {
    return new google.maps.Marker({ position, map });
  }

}
