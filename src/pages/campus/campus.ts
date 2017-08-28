import {Component, ViewChild, ElementRef} from "@angular/core";
import {IonicPage, ModalController, NavController, NavParams, Platform} from "ionic-angular";
import {GoogleMapsForJS} from "../../providers/google-maps";
import {Locations} from "../../providers/locations";

@IonicPage()
@Component({
    selector: 'page-campus',
    templateUrl: 'campus.html',
})
export class CampusPage {

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
                public mapService: GoogleMapsForJS,
                public locations: Locations,
                public modalCtrl: ModalController) {

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
        return segmentContent !== this.findBySegment;
    }

    openFilter() {
        let modal = this.modalCtrl.create('Filter');
        modal.present();
    }

    openDetails(lot) {
        this.navCtrl.push('ParkingDetails', {"lot": lot});
    }

}
