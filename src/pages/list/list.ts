import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad List');
  }

  openDetails(lot) {
    console.log('opening');
    this.navCtrl.push('ParkingDetails', {lot: lot});
  }

  openBrowse() {
    this.navCtrl.push('BrowseByCampus');
  }

}
