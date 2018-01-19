import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {HttpModule} from '@angular/http';
import { Camera} from '@ionic-native/camera';
import { ActionSheet } from '@ionic-native/action-sheet';
import { ImagePicker } from '@ionic-native/image-picker';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SettingPage} from '../pages/setting/setting';
import {SelectProjectPage} from '../pages/select-project/select-project';
import {PzrecordPage} from '../pages/pzrecord/pzrecord';
import {Newpz1Page} from '../pages/newpz1/newpz1'
import {Newpz2Page} from '../pages/newpz2/newpz2'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ListPage} from '../pages/list/list';
import {DetailPage} from '../pages/detail/detail';
import {DaohangPage} from '../pages/daohang/daohang';
import {CaiyangPage} from '../pages/caiyang/caiyang';
import {NativeService} from "../provider/NativeService";
import {File} from "@ionic-native/file";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    SettingPage,
    SelectProjectPage,
    PzrecordPage,
    Newpz1Page,
    Newpz2Page,
    ListPage,
    DetailPage,
    DaohangPage,
    CaiyangPage,
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    SettingPage,
    SelectProjectPage,
    PzrecordPage,
    Newpz1Page,
    Newpz2Page,
    ListPage,
    DetailPage,
    DaohangPage,
    CaiyangPage
  ],
  providers: [
    ImagePicker,
    ActionSheet,
    Camera,
    StatusBar,
    SplashScreen,
    NativeService,
    File,
    FileTransfer,
    FileTransferObject,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
