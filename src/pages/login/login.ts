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
import { Report, Profile } from '../../models/profile';
import { ReportProvider } from '../../providers/report/report';


import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import firebase from 'firebase';
import { UserProvider } from '../../providers/user/user';
import { ProfilePage } from '../profile/profile';
import { ProfilepicPage } from '../profilepic/profilepic';

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

  report = {} as Report;

  profileFacebook = {} as Profile;
  url: string;
  uid: any;

  // video: any = {
  //      url: 'https://www.youtube.com/embed/MLleDRkSuvk',
  //      title: 'Awesome video'
  //  };


  constructor(private translate: TranslateService, private afAuth: AngularFireAuth, private toastCrt: ToastController,
    public navCtrl: NavController, public navParams: NavParams, public authservice: AuthProvider,
    public reportservice: ReportProvider,
    private facebook: Facebook,
    public userservice: UserProvider) {

    this.lang = 'en';

    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.loadreport();
    console.log("Rest report", this.report)

  }

  // This code for load report of number of user from social network

  loadreport() {

    this.reportservice.report().then((res: any) => {
      this.report = res;
    })
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
          this.navCtrl.setRoot(TabsPage)
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
    this.navCtrl.push(RegisterPage);
    //this.navCtrl.setRoot('HomePage');
    //chinh sua phan register
    // this.navCtrl.setRoot(ProfilePage)

  }

  passwordreset() {
    this.navCtrl.push(PasswordresetPage)
    //this.navCtrl.push('TabsPage')
  }

  // playVideo(a:string){
  //   this.youtube.openVideo('a');
  //   console.log('running run');
  // }

  switchLanguage() {
    this.translate.use(this.lang);
  }

  // Facbook login method
  loginFacebook(){

    this.userservice.getUidFacebook().then((uidString) => {
      this.navCtrl.setRoot(ProfilepicPage, {uid: uidString});
    })

   



    // This is right
    // this.facebook.login(["email"]).then((loginResponse) =>{

     

    //   let credential = firebase.auth.FacebookAuthProvider.credential(loginResponse.authResponse.accessToken);
    //   firebase.auth().signInWithCredential(credential).then((info) =>{
    //     alert(JSON.stringify(info));
    //     this.profileFacebook.age = info.birthday;
    //     this.profileFacebook.firstName = info.name;
    //     this.profileFacebook.gender = info.gender;
    //     this.profileFacebook.username = "Facebook";

    //     this.url=info.photoURL;
    //     this.uid=info.uid;
    //     return info.uid;

        
    //     //this.navCtrl.setRoot(ProfilePage);
    //     // this.userservice.addfulluserFromFacebook(this.profileFacebook,  info.photoURL, info.uid,).then((res: any) => {

    //     //   if (res.success) {
    //     //     alert('Thanh cong');
    //     //     this.navCtrl.setRoot(TabsPage);

    //     //   }
         
    //     //   //  this.navCtrl.setRoot('TabsPage', { my: this.profile });
    //     //   // this.navCtrl.setRoot('ProefilPage');
  
    //     //   else
    //     //     { alert('Error' + res);
    //     //     this.navCtrl.setRoot(ProfilePage);
    //     //   }
           
    //     // })
        
    //   })

      

    // }).then((uidFace) =>
      
    //   {
    //   this.navCtrl.setRoot(ProfilepicPage, {uid: uidFace});
 

    // })

    
    // this.userservice.addfulluserFromFacebook(this.profileFacebook, this.url, this.uid ).then((res: any) => {

    //   if (res.success)
    //     this.navCtrl.setRoot(TabsPage);
    //   //  this.navCtrl.setRoot('TabsPage', { my: this.profile });
    //   // this.navCtrl.setRoot('ProfilePage');

    //   else {alert('Error' + res);
    //   this.navCtrl.setRoot(ProfilePage);}
        
    // })


    

  //   this.facebook.login(['public_profile', 'user_friends', 'email'])
  // .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
  // .catch(e => console.log('Error logging into Facebook', e));
  }

  // loginFacebook() {
  //   // Login with permissions
  //   this.facebook.login(['public_profile', 'user_photos', 'email', 'user_birthday'])
  //     .then((res: FacebookLoginResponse) => {

  //       // The connection was successful
  //       if (res.status == "connected") {

  //         // Get user ID and Token
  //         var fb_id = res.authResponse.userID;
  //         var fb_token = res.authResponse.accessToken;

  //         // Get user infos from the API
  //         this.facebook.api("/me?fields=name,gender,birthday,email", []).then((user) => {

  //           // Get the connected user details
  //           var gender = user.gender;
  //           var birthday = user.birthday;
  //           var name = user.name;
  //           var email = user.email;

  //           console.log("=== USER INFOS ===");
  //           console.log("Gender : " + gender);
  //           console.log("Birthday : " + birthday);
  //           console.log("Name : " + name);
  //           console.log("Email : " + email);

  //           // => Open user session and redirect to the next page

  //         });

  //       }
  //       // An error occurred while loging-in
  //       else {

  //         console.log("An error occurred...");

  //       }

  //     })
  //     .catch((e) => {
  //       console.log('Error logging into Facebook', e);
  //     });
  // }




}
