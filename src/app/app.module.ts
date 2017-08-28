import {BrowserModule} from "@angular/platform-browser";
import {ErrorHandler, NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {CloudSettings, CloudModule} from "@ionic/cloud-angular";
import {Deeplinks} from "@ionic-native/deeplinks";
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";
import {MyApp} from "./app.component";
import {ParkingService} from "../providers/parking.service";
import {Locations} from "../providers/locations";
import {Connectivity} from "../providers/connectivity";
import {GoogleMapsForJS} from "../providers/google-maps";
import {GoogleMaps} from "@ionic-native/google-maps";
import {GoogleMapsPluginProvider } from '../providers/google-maps-plugin/google-maps-plugin';
//import { GoogleMapsNativeProvider } from '../providers/google-maps-native/google-maps-native';


const cloudSettings: CloudSettings = {
    'core': {
        'app_id': '48661a59'
    }
};

@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(MyApp),
        CloudModule.forRoot(cloudSettings)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        Deeplinks,
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        ParkingService, Locations, GoogleMapsForJS, Connectivity,
        GoogleMaps, GoogleMapsPluginProvider
    ]
})
export class AppModule {
}
