import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParkingSaved } from './parking-saved';

@NgModule({
  declarations: [
    ParkingSaved,
  ],
  imports: [
    IonicPageModule.forChild(ParkingSaved),
  ],
  exports: [
    ParkingSaved
  ]
})
export class ParkingSavedModule {}
