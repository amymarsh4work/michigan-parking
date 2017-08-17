import { Component } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Deeplinks } from '@ionic-native/deeplinks';

import { BrowseByCampus } from '../pages/browse-by-campus/browse-by-campus';
import { ParkingSaved } from '../pages/parking-saved/parking-saved';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'TabsPage';
  nav: Nav;

  constructor(private platform: Platform, private deeplinks: Deeplinks, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.deeplinks.routeWithNavController(this.nav, {
        '/browse-by-campus': BrowseByCampus,
        '/parking-saved': ParkingSaved
      });
    });
  }
}

