import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams, ActionSheetController } from 'ionic-angular';
import { ParkingService } from '../../providers/parking.service';
import { Parking } from '../../providers/parking.model';

import { GoogleMaps } from '../../providers/google-maps';
import { Locations } from '../../providers/locations';

@IonicPage()
@Component({
  selector: 'page-parking-details',
  templateUrl: 'parking-details.html',
})
export class ParkingDetails {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  errorMessage: string;
  parking: Parking;
  mode = 'Observable';

  lotDetail: any;
  lot: string;

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController,
              public parkingService: ParkingService,
              public mapService: GoogleMaps,
              public locations: Locations) {

    this.lot = navParams.get('lot');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParkingDetails for:', this.lot);

    this.platform.ready().then(() => {

      let mapLoaded = this.mapService.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
      let locationLoaded = this.locations.getLotDetail(this.lot);

      Promise.all([
        mapLoaded,
        locationLoaded
      ]).then((result) => {

        console.debug('result:', result);
        this.lotDetail = result[1];

        this.mapService.addMarker(this.lotDetail.latitude, this.lotDetail.longitude);

      }).catch((err) => console.error('Promise.all', err));

    });

  }

  openMapActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Open in',
      buttons: [
        {
          text: 'Apple Maps',
          role: 'destructive',
          handler: () => {
            console.log('Apple clicked');
          }
        },{
          text: 'Google Maps',
          role: 'destructive',
          handler: () => {
            console.log('Google clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
