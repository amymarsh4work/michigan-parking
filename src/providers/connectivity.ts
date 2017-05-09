import {Injectable} from "@angular/core";
import {Network} from "ionic-native";
import {Platform} from "ionic-angular";

declare var Connection;

@Injectable()
export class Connectivity {

    onDevice: boolean;

    constructor(public platform: Platform) {
        console.log('Initializing Connectivity Provider...')
        this.onDevice = this.platform.is('cordova');
    }

    isOnline(): boolean {
        if (this.onDevice && Network.type) {
            return Network.type !== 'none';
        } else {
            return navigator.onLine;
        }
    }

    isOffline(): boolean {
        if (this.onDevice && Network.type) {
            return Network.type === 'none';
        } else {
            return !navigator.onLine;
        }
    }

}