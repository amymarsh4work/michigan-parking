import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {IonicPage, NavController, NavParams, Platform} from "ionic-angular";
//import {Parking} from "../../providers/parking.model";
import {Locations} from "../../providers/locations";
import {
    BaseArrayClass,
    GoogleMap,
    GoogleMapOptions,
    GoogleMaps,
    GoogleMapsEvent,
    LatLng,
    Marker,
    MarkerOptions
} from "@ionic-native/google-maps";

import {filter, reject} from "lodash";

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {

    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

    public parking: any[];
    public errorMessage: string;
    public findBySegment: string = 'list';
    public mapOn: boolean = false;
    public filterByCampus: string;
    public map: GoogleMap;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public platform: Platform,
                public locations: Locations,
                public googleMaps: GoogleMaps) {

        this.filterByCampus = navParams.get('campus');
    }

    ngOnInit() {
        this.loadParkingData();
    }

    ionViewDidLoad() {
        this.platform.ready().then(() => {
            this.loadMap();
        });
    }

    private loadParkingData() {
        console.debug('filterByCampus', this.filterByCampus);

        let getParking = this.filterByCampus ? this.locations.getLotsForCampus(this.filterByCampus) : this.locations.load();

        Promise.resolve(getParking)
            .then((result) => {
                this.parking = reject(result, {latitude: null, longitude: null});
            })
            .catch((error) => {
                this.errorMessage = <any>error;
                console.error(this.errorMessage);
            });
    }

    private loadMap() {
        let element: HTMLElement = document.getElementById('map');
        let latLngAnnArbor: LatLng = new LatLng(42.2808, 83.7430);
        let mapOptions: GoogleMapOptions = {
            camera: {
                target: latLngAnnArbor,
                zoom: 18
            },
            controls: {
                myLocationButton: true,
            }
        };

        this.map = this.googleMaps.create(element, mapOptions);
        this.map.setVisible(false);

        this.map.one(GoogleMapsEvent.MAP_READY)
            .then(() => {
                this.positionMap();
            });
    }

    private positionMap() {
        this.map.getMyLocation()
            .then((location) => {
                let myPosition: LatLng = new LatLng(location.latLng.lat, location.latLng.lng);

                this.map.moveCamera({target: myPosition})
                    .then(() => {
                        this.map.setVisible(true);
                        this.applyLocationMarkers(this.parking);
                    });
            })
            .catch((error) => {
                this.errorMessage = <any>error;
                console.error(this.errorMessage);
            });
    }

    private applyLocationMarkers(locations: any[]) {
        let bounds = [];
        let nearest = locations.slice(0, 10);
        let baseArray = new BaseArrayClass(nearest);

        baseArray.forEach((location) => {
            let position = new LatLng(location.latitude, location.longitude);
            let markerOptions: MarkerOptions = {
                title: location.lot,
                icon: location.type,
                position: position
            };

            bounds.push(position);

            this.map.addMarker(markerOptions)
                .then((marker: Marker) => {
                    //marker.showInfoWindow();
                });
        });

        this.map.animateCamera({target: bounds});
    }

    selectedMap(bool) {
        this.mapOn = bool;
        if (this.mapOn === true) {
            //this.mapService.resizeMap();
        }
    }

    openDetails(lot) {
        this.navCtrl.push('ParkingDetails', {lot: lot});
    }

}
