import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParkingDetails } from './parking-details';

@NgModule({
  declarations: [
    ParkingDetails,
  ],
  imports: [
    IonicPageModule.forChild(ParkingDetails),
  ],
  exports: [
    ParkingDetails
  ]
})
export class ParkingDetailsModule {}
