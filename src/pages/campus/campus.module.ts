import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CampusPage } from './campus';

@NgModule({
  declarations: [
    CampusPage,
  ],
  imports: [
    IonicPageModule.forChild(CampusPage),
  ],
  exports: [
    CampusPage
  ]
})
export class CampusModule {}
