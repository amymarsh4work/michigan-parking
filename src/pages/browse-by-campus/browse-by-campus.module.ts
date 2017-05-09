import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrowseByCampus } from './browse-by-campus';

@NgModule({
  declarations: [
    BrowseByCampus,
  ],
  imports: [
    IonicPageModule.forChild(BrowseByCampus),
  ],
  exports: [
    BrowseByCampus
  ]
})
export class BrowseByCampusModule {}

