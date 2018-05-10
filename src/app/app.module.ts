import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';

import { FIREBASE_CONFIG } from './app.firebase.config';

import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

import { IonicImageViewerModule } from 'ionic-img-viewer';

import { PreferencePage } from '../pages/preference/preference';

import { PreferenceSub1Page } from '../pages/preference-sub1/preference-sub1';


import { MyPage } from "../pages/my/my";



@NgModule({
  declarations: [
    MyApp,
   
    // PreferencePage,
    PreferenceSub1Page

   
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG), // Firebase database is ready to populate
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicImageViewerModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    
    // PreferencePage,
    PreferenceSub1Page


  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth
    

  ]
})
export class AppModule {}
