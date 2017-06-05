import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { Locations } from '../../providers/locations';
import { GoogleMaps } from '../../providers/google-maps';
import { Parking } from '../../providers/parking.model';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  parking: Parking[];

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  constructor(public navCtrl: NavController, public mapService: GoogleMaps, public platform: Platform, public locations: Locations) {

  }

  ionViewDidLoad(){
    console.log('viewDidLoad MapPage');
    this.platform.ready().then(() => {
      //let userLocation = this.mapService.getCurrentPosition();
      let mapLoaded = this.mapService.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
      let locationsLoaded = this.locations.load();

      Promise.all([
        //userLocation,
        mapLoaded,
        locationsLoaded]).then((result) => {
        let locations = result[1];
        this.parking = result[1];
        for (let location of locations) {
          this.mapService.addMarker(location.lat, location.lng);
        }
      });
    });
  }

}