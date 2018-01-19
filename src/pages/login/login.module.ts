import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import {HttpModule} from '@angular/http';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    HttpModule,
    IonicPageModule.forChild(LoginPage),
  ],
})
export class LoginPageModule {}
