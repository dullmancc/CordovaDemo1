import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectProjectPage } from './select-project';

@NgModule({
  declarations: [
    SelectProjectPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectProjectPage),
  ],
})
export class SelectProjectPageModule {}
