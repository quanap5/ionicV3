import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { LoginPage } from '../pages/login/login';
import { Profile } from "../models/profile";

import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { ViewmorePage } from '../pages/viewmore/viewmore';
import { ChatPage } from '../pages/chat/chat';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild('content') navCtrl: NavController // <--- Reference to https://stackoverflow.com/questions/38121961/ionic-2-exception-no-provider-for-navcontroller
  rootPage: any = LoginPage;
  isShowMenu :boolean = true;
  

  constructor(private translate: TranslateService, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private   push: Push) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.pushSetup(); // them vao
    });

    this.initTranslate();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');


    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }

  }

  pushSetup() {
    const options: PushOptions = {
      android: {
        senderID: '298338389512',
        sound: true,
        vibrate: true,
        icon: 'notification',
        clearBadge: true
      },
      ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
      }
   };
   
   const pushObject: PushObject = this.push.init(options);
   
   
   pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
   
   pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
   
   pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }


  // For menu side

  openViewmore(){
    this.navCtrl.push(ViewmorePage)

  }

  openMessage(){
    this.navCtrl.push(ChatPage)

  }



}

