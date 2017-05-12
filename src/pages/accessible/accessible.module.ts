import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccessiblePage } from './accessible';

@NgModule({
  declarations: [
    AccessiblePage,
  ],
  imports: [
    IonicPageModule.forChild(AccessiblePage),
  ],
  exports: [
    AccessiblePage
  ]
})
export class AccessiblePageModule {}
