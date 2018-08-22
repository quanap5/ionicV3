import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';

import { FIREBASE_CONFIG } from './app.firebase.config';

//import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

import { IonicImageViewerModule } from 'ionic-img-viewer';

import { PreferencePage } from '../pages/preference/preference';

import { PreferenceSub1Page } from '../pages/preference-sub1/preference-sub1';


//import { MyPage } from "../pages/my/my";
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
import { ImghandlerProvider } from '../providers/imghandler/imghandler';

import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { RequestsProvider } from '../providers/requests/requests';
import { ChatProvider } from '../providers/chat/chat';

import { Geolocation } from '@ionic-native/geolocation';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ProfilepicPage } from '../pages/profilepic/profilepic';
import { ProfilePage } from '../pages/profile/profile';
//import { TabsPage } from '../pages/tabs/tabs';
import { ProfileEditPage } from '../pages/profile-edit/profile-edit';
import { PasswordresetPage } from '../pages/passwordreset/passwordreset';
// import { HomePage } from '../pages/home/home';
// import { ChatPage } from '../pages/chat/chat';
// import { LoadmapPage } from '../pages/loadmap/loadmap';

import { Profile } from "../models/profile";
import { TabsPage } from '../pages/tabs/tabs';
import { MyPage } from '../pages/my/my';
import { HomePage } from '../pages/home/home';
import { ChatPage } from '../pages/chat/chat';
import { LoadmapPage } from '../pages/loadmap/loadmap';

import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { PreferenceSub2Page } from '../pages/preference-sub2/preference-sub2';
import { PreferenceSub3Page } from '../pages/preference-sub3/preference-sub3';
import { PreferenceSub4Page } from '../pages/preference-sub4/preference-sub4';
import { PreferenceSub5Page } from '../pages/preference-sub5/preference-sub5';
import { BuddyprofilePage } from '../pages/buddyprofile/buddyprofile';
import { ReportProvider } from '../providers/report/report';

import {YoutubeVideoPlayer} from '@ionic-native/youtube-video-player'
import { ViewmorePage } from '../pages/viewmore/viewmore';
import { ComingsoonPage } from '../pages/comingsoon/comingsoon';
import { AdditionalSearchPage } from '../pages/additional-search/additional-search';
import { Facebook } from '@ionic-native/facebook';
import { StripeNativePage } from '../pages/stripe-native/stripe-native';

import { Stripe} from '@ionic-native/stripe' // for payment
import { BuddychatPage } from '../pages/buddychat/buddychat';
import { PaymentProvider } from '../providers/payment/payment';
import { ManageChargePage } from '../pages/manage-charge/manage-charge';
import { ChargeCoinsPage } from '../pages/charge-coins/charge-coins';
import { MyInterestUsersPage } from '../pages/my-interest-users/my-interest-users';
import { MyLikeUsersPage } from '../pages/my-like-users/my-like-users';
import { NewUsersPage } from '../pages/new-users/new-users';
import { MatchingPage } from '../pages/matching/matching';






@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    ProfilepicPage,
    ProfilePage,
    TabsPage,

    ProfileEditPage,
    PasswordresetPage,
    PreferencePage,

    MyPage,
    HomePage,
    ChatPage,
    LoadmapPage,
    BuddyprofilePage,
    BuddychatPage,




    // PreferencePage,
    PreferenceSub1Page,
    PreferenceSub2Page,
    PreferenceSub3Page,
    PreferenceSub4Page,
    PreferenceSub5Page,


    // ViewAll button
    ViewmorePage,
    ComingsoonPage,
    AdditionalSearchPage,

    // Payment
    StripeNativePage,
    ManageChargePage,
    ChargeCoinsPage,

    // MyinterestUser
    MyInterestUsersPage,
    MyLikeUsersPage,
    NewUsersPage,

    //Maching
    MatchingPage


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG), // Firebase database is ready to populate
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicImageViewerModule,
  



  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    ProfilepicPage,
    ProfilePage,
    TabsPage,

    ProfileEditPage,
    PasswordresetPage,
    PreferencePage,

    MyPage,
    HomePage,
    ChatPage,
    LoadmapPage,
    BuddyprofilePage,
    BuddychatPage,

    // PreferencePage,
    PreferenceSub1Page,
    PreferenceSub2Page,
    PreferenceSub3Page,
    PreferenceSub4Page,
    PreferenceSub5Page,

    // viewall button
    ViewmorePage,
    ComingsoonPage,
    AdditionalSearchPage,

    // payment
    StripeNativePage,
    ManageChargePage,
    ChargeCoinsPage,

    // MyinterestUser
    MyInterestUsersPage,
    MyLikeUsersPage,
    NewUsersPage,

    
    //Maching
    MatchingPage




  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    File,
    FilePath,
    FileChooser,
    Push,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AngularFireAuth,
    AuthProvider,
    UserProvider,
    ImghandlerProvider,
    RequestsProvider,
    ChatProvider,
    Geolocation,
    ReportProvider,

    YoutubeVideoPlayer,
    Facebook,

    Stripe,
    PaymentProvider

    


   


  ]
})

export class AppModule { }

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

