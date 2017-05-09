import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { Tabs } from '../pages/tabs/tabs';

import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { MapModule } from '../pages/map/map.module';
import { ListPage } from '../pages/list/list';
import { ListModule } from '../pages/list/list.module';
import { BrowseByCampus } from '../pages/browse-by-campus/browse-by-campus';
import { BrowseByCampusModule } from '../pages/browse-by-campus/browse-by-campus.module';
import { Campus } from '../pages/campus/campus';
import { CampusModule } from '../pages/campus/campus.module';
import { Filter } from '../pages/filter/filter';
import { FilterModule } from '../pages/filter/filter.module';
import { ParkingDetails } from '../pages/parking-details/parking-details';
import { ParkingDetailsModule } from '../pages/parking-details/parking-details.module';
import { ParkingSaved } from '../pages/parking-saved/parking-saved';
import { ParkingSavedModule } from '../pages/parking-saved/parking-saved.module';
import { ParkingService } from '../providers/parking.service';
import { Locations } from '../providers/locations';
import { GoogleMaps } from '../providers/google-maps';
import { Connectivity } from '../providers/connectivity';


const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '48661a59'
  }
};

@NgModule({
  declarations: [
    MyApp,
      Tabs,
    HomePage,
      BrowseByCampus,
      Campus,
      Filter,
      ParkingDetails,
      ParkingSaved,
      MapPage,
      ListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
      Tabs,
    HomePage,
      BrowseByCampus,
      Campus,
      Filter,
      ParkingDetails,
      ParkingSaved,
      MapPage,
      ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
      ParkingService, Locations, GoogleMaps, Connectivity
  ]
})
export class AppModule {}
