import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BrowseByCampus} from "../browse-by-campus/browse-by-campus";
import {ParkingDetails} from "../parking-details/parking-details";

/**
 * Generated class for the List page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad List');
  }

  openDetails(lot) {
    console.log('opening');
    this.navCtrl.push(ParkingDetails, {lot: lot});
  }

  openBrowse() {
    this.navCtrl.push(BrowseByCampus);
  }


}
