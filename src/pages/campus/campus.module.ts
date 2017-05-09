import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Campus } from './campus';

@NgModule({
  declarations: [
    Campus,
  ],
  imports: [
    IonicPageModule.forChild(Campus),
  ],
  exports: [
    Campus
  ]
})
export class CampusModule {}
