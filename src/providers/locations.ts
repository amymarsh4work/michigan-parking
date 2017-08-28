import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Geolocation} from "ionic-native";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";

@Injectable()
export class Locations {

    public data: any;
    public location: any;

    constructor(public http: Http) {
    }

    public getAllLots() {
        if (this.data) {
            return Promise.resolve(this.data);
        }
        else {
            console.error('Need to get the data!');
        }
    }

    public getLotsForCampus(campus: string): Promise<any> {
        return new Promise((resolve) => {
            let res = this.data;
            let lots = res.filter((res) => res.campus === campus);
            resolve(lots);
        });
    }

    public getLotDetail(name: string): Promise<any> {

        return new Promise((resolve) => {
            let res = this.data;
            let detail = res.filter((res) => res.lot === name)[0];
            //setTimeout(() => resolve(detail), 1000);
            resolve(detail);
        });
    }

    public load() {

        if (this.data) {
            return Promise.resolve(this.data);
        }

        return new Promise(resolve => {

            this.http.get('assets/data/parking.json').map(res => res.json()).subscribe(data => {

                Geolocation.getCurrentPosition().then((position) => {
                    this.data = this.applyHaversine(data, position);
                    console.log('this.data', this.data);

                    this.data.sort((locationA, locationB) => {
                        return locationA.distance - locationB.distance;
                    });

                    resolve(this.data);

                });
            });
        });
    }

    private applyHaversine(locations, position) {

        locations.map((location) => {

            let usersLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            let placeLocation = {
                lat: location.latitude,
                lng: location.longitude
            };

            location.distance = this.getDistanceBetweenPoints(
                usersLocation,
                placeLocation,
                'miles'
            ).toFixed(2);
        });

        return locations;
    }

    private getDistanceBetweenPoints(start, end, units) {

        let earthRadius = {
            miles: 3958.8,
            km: 6371
        };

        let R = earthRadius[units || 'miles'];
        let lat1 = start.lat;
        let lon1 = start.lng;
        let lat2 = end.lat;
        let lon2 = end.lng;

        let dLat = this.toRad((lat2 - lat1));
        let dLon = this.toRad((lon2 - lon1));
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;

        return d;
    }

    private toRad(x) {
        return x * Math.PI / 180;
    }

}
