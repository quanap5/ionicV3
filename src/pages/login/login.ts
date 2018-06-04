import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Loading } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player'

import { User } from "../../models/user";

import { AuthProvider } from '../../providers/auth/auth';

import { TranslateService } from '@ngx-translate/core';

import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { PasswordresetPage } from '../passwordreset/passwordreset';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  lang: any;

  // video: any = {
  //      url: 'https://www.youtube.com/embed/MLleDRkSuvk',
  //      title: 'Awesome video'
  //  };


  constructor(private translate: TranslateService, private afAuth: AngularFireAuth, private toastCrt: ToastController,
    public navCtrl: NavController, public navParams: NavParams, public authservice: AuthProvider) {

    this.lang = 'en';

    this.translate.setDefaultLang('en');
    this.translate.use('en');

  }




  // This code for login in version1
  async login_ori(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email + '@' + user.type, user.password);
      console.log(result);
      if (result) {

        //this.navCtrl.setRoot('HomePage');
        this.navCtrl.setRoot('MyPage');
        //this.navCtrl.setRoot('MyPage');
        // this.navCtrl.setRoot('PreferencePage');
      }
      else {
        this.toastCrt.create({
          message: `Failing`,
          duration: 3000
        }).present();



      }

    }
    catch (e) {

      this.toastCrt.create({
        message: `Error`,
        duration: 3000
      }).present();




      console.log(e);

    }


  }


  /*
  This is for Login activity
  */

  async signin() {
    try {
      await this.authservice.login(this.user).then((res: any) => {
        if (!res.code) {
          // code...
          this.navCtrl.setRoot( TabsPage)
        } else {
          // code...
          alert(res);
        }
      })

    }

    catch (e) {

      this.toastCrt.create({
        message: `[Failing in login] Please cheack your email or your password `,
        duration: 3000
      }).present();

    }


  }

  register() {
    this.navCtrl.push( RegisterPage );
    //this.navCtrl.setRoot('HomePage');

  }

  passwordreset() {
    this.navCtrl.push( PasswordresetPage )
    //this.navCtrl.push('TabsPage')
  }

  // playVideo(a:string){
  //   this.youtube.openVideo('a');
  //   console.log('running run');
  // }

  switchLanguage() {
    this.translate.use(this.lang);
  }




}
