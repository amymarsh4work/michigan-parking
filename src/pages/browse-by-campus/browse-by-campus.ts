import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CampusPage } from '../campus/campus';


@IonicPage()
@Component({
  selector: 'page-browse-by-campus',
  templateUrl: 'browse-by-campus.html',
})
export class BrowseByCampus {
  public selectedCampus: string;
  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BrowseByCampus');
  }

  openCampus(campus) {
    this.navCtrl.push('CampusPage', {'campus': campus});
  }

}
