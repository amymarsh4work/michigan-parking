import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Campus } from '../campus/campus';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-browse-by-campus',
  templateUrl: 'browse-by-campus.html',
})
export class BrowseByCampus {
  public selectedCampus: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BrowseByCampus');
  }

  openCampus(campus) {
    this.navCtrl.push(Campus, {'campus': campus});
  }

}
