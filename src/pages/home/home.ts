import {Component, ElementRef, ViewChild} from "@angular/core";
import {IonicPage, NavController, NavParams, Platform} from "ionic-angular";
/*import {BrowseByCampus} from "../browse-by-campus/browse-by-campus";
import {ParkingSaved} from "../parking-saved/parking-saved";
import {ParkingDetails} from "../parking-details/parking-details";*/
import {ParkingService} from "../../providers/parking.service";
import {Parking} from "../../providers/parking.model";
import {Locations} from "../../providers/locations";
import {GoogleMaps} from "../../providers/google-maps";

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

    private findBySegment: string = 'list';
    private mapOn: boolean = false;
    errorMessage: string;
    parking: Parking[];

    filterByCampus: string;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public platform: Platform,
                public parkingService: ParkingService,
                public locations: Locations,
                public mapService: GoogleMaps) {

        this.filterByCampus = navParams.get('campus');
    }

    ionViewDidLoad() {

        console.debug('ionViewDidLoad() for Home...');

        this.platform.ready().then(() => {

            let mapLoaded = this.mapService.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
            let locationsLoaded = this.filterByCampus ? this.locations.getLotsForCampus(this.filterByCampus) : this.locations.load();

            Promise.all([
                mapLoaded,
                locationsLoaded
            ]).then((result) => {

                let locations = result[1];
                this.parking = result[1];

                for (let location of locations) {
                    this.mapService.addMarker(location.latitude, location.longitude);
                }

            });

        });

    }

    selectedMap(bool) {
        this.mapOn = bool;
        if (this.mapOn === true) {
            this.mapService.resizeMap();
        }
    }

    /*getParking() {
     this.parkingService.getLots()
     .subscribe(
     (parking) => {
     console.log('parking', parking);
     this.parking = parking;
     },
     (error) => this.errorMessage = <any>error
     );
     }*/

    openDetails(lot) {
        this.navCtrl.push('ParkingDetails', {lot: lot});
    }

    openBrowse() {
        this.navCtrl.push('BrowseByCampus');
    }

    openSaved() {
        this.navCtrl.push('ParkingSaved');
    }

}
