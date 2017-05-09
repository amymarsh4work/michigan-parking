import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { Filter } from '../filter/filter';
import { ParkingDetails } from '../parking-details/parking-details';

import { GoogleMaps } from '../../providers/google-maps';
import { Locations } from '../../providers/locations';

@IonicPage()
@Component({
  selector: 'page-campus',
  templateUrl: 'campus.html',
})
export class Campus {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  public campus: string;
  public errorMessage: string;

  private campusMapOn: boolean = false;

  private findBySegment: string = 'list';

  public campusLots: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public mapService: GoogleMaps,
              public locations: Locations) {

    this.campus = navParams.get('campus');
  }

  selectedMap(bool) {
    this.campusMapOn = bool;
    if (this.campusMapOn === true) {
      this.mapService.resizeMap();
    }
      console.debug('mapOn', this.campusMapOn);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad lots for:', this.campus);

    this.platform.ready().then(() => {

      let mapLoaded = this.mapService.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
      let locationsLoaded = this.locations.getLotsForCampus(this.campus);

      Promise.all([
        mapLoaded,
        locationsLoaded
      ]).then((result) => {

        this.campusLots = result[1];

        console.log('result:', result[1]);
        for (let lot of this.campusLots) {
          this.mapService.addMarker(lot.latitude, lot.longitude);
        }

      }).catch((err) => console.error('Promise.all', err));

    });

  }

  toggleSegment(segmentContent) {
    //console.log('weird stuff: the selected segment is: ' + this.findBySegment + ", " + segmentContent + ' should be hidden: ' + (segmentContent !== this.findBySegment));
    return segmentContent !== this.findBySegment;
  }

  openFilter() {
    this.navCtrl.push(Filter);
  }

  openDetails(lot) {
    this.navCtrl.push(ParkingDetails, {"lot": lot})
  }



}
