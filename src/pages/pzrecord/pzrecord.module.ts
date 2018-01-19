import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {PzrecordPage} from './pzrecord';

@NgModule({
  declarations: [
    PzrecordPage,
  ],
  imports: [
    IonicPageModule.forChild(PzrecordPage),
  ],
})
export class PzrecordPageModule {}
