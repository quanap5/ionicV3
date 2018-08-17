import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile, Report } from "../../models/profile";
import { AngularFireDatabase } from 'angularfire2/database';
import { UserProvider } from '../../providers/user/user';

import { Geolocation } from '@ionic-native/geolocation';
import { TabsPage } from '../tabs/tabs';
import { ReportProvider } from '../../providers/report/report';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profile = {} as Profile;

  // create 2 associated selection\

  public citys: any[];
  public districts: any[];

  public selectedDistricts: any[];

  public sCity: any;
  public sDistrict: any;

  public selectedBackground: boolean;
  public selectedMale: boolean = false;
  public selectedFemale: boolean = false;

  public year: number;

  rangeHeight: number[] = new Array(20);

  rangeWeight: number[] = new Array(20);

  report = {} as Report;

  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, private toastCrt: ToastController,
    public navCtrl: NavController, public navParams: NavParams, public userservice: UserProvider,
    public geolocation: Geolocation,
    public reportservice: ReportProvider) {

    this.initial_photoURL();
    this.getGPS();
    this.profile.coin = 50;
    this.profile.beviewed = 0;
    this.profile.beliked = 0;
    this.profile.noPhoto = 0;


    let init_height = { height: { min: 0, max: 1 } }

    this.initializeCity();
    this.initializeDistrict();
    this.selectedBackground = false;
    this.profile.target = "marriage";
    //this.profile.pref= init_height;
    //this.profile.pref.height.max=1;
    // this.profile.preference.height.max=0;
    var currentTime = new Date();
    this.year = currentTime.getFullYear();

    //khai bao range of height and weigh

    for (var i = 0; i < 30; ++i) {
      // code...
      this.rangeHeight[i] = 150 + i;
      //this.selectedmax_Height.push(this.height[i]);
      this.rangeWeight[i] = 40 + i * 2;
      //this.selectedmax_Weight.push(this.weight[i]);
    }

    this.loadreport();


  }

  initial_photoURL() {
    this.profile.profileURL1 = 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e';
    this.profile.profileURL2 = 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e';
    this.profile.profileURL3 = 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e';
    this.profile.profileURL4 = 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e';

  }

  getGPS() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.profile.latitude = resp.coords.latitude;
      this.profile.longtitude = resp.coords.longitude;
      // this.profile.latitude = resp.coords.latitude;
      // this.profile.longtitude = resp.coords.longitude;
      console.log(this.profile.longtitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  createProfile() {

    var toaster = this.toastCrt.create({
      duration: 4000,
      position: 'bottom'
    });


    if (this.profile.username == '' || this.profile.username == null ||
      this.profile.firstName == '' || this.profile.firstName == null ||
      this.profile.lastName == '' || this.profile.lastName == null ||
      this.profile.target == '' || this.profile.target == null ||
      this.profile.gender == '' || this.profile.gender == null ||
      this.profile.age == '' || this.profile.age == null ||
      this.profile.education == '' || this.profile.education == null ||
      this.profile.city.name == '' || this.profile.city.name == null) {
      // code...
      toaster.setMessage('All fields should be not blank');
      toaster.present();

    } else {
      // code...
      this.string2Age();
      //     this.afAuth.authState.take(1).subscribe(auth => {
      //       // them vao
      //   //this.afDatabase.object(`users/${auth.uid}`).set(this.profile);

      //   this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
      //   .then(() => this.navCtrl.setRoot('TabsPage', {my: this.profile} ));

      // })

      // this.afAuth.authState.take(1).subscribe(auth => {
      //   this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
      // }) // add profile object to firebasee

      // Call userservice to add profile that use one parameter transfered from previous page (profilepic)
      
      /*Fire base user for general case*/
      if (this.navParams.get('uid') == undefined) {
        this.userservice.addfulluser(this.profile, this.navParams.get('url')).then((res: any) => {

        if (res.success)
          this.navCtrl.setRoot(TabsPage);
        //  this.navCtrl.setRoot('TabsPage', { my: this.profile });
        // this.navCtrl.setRoot('ProfilePage');

        else
          alert('Error' + res);
      })

        
      } else {

        /*Fire base user for Facebook case*/ 

      this.userservice.addfulluser2(this.profile, this.navParams.get('url'), this.navParams.get('uid') ).then((res: any) => {

        if (res.success) {
          this.navCtrl.setRoot(TabsPage);
          alert(this.navParams.get('uid'));}
        //  this.navCtrl.setRoot('TabsPage', { my: this.profile });
        // this.navCtrl.setRoot('ProfilePage');

        else
          alert('Error' + res);
      })
        
      }

       /* update the report increace 1 user to respective user (male or female) and sumuser */

      if (this.profile.gender == 'male') {
        this.report.maleUser = this.report.maleUser + 1;
        this.report.sumUser = this.report.sumUser + 1;

      }
      else if(this.profile.gender == 'female'){
        this.report.femaleUser = this.report.femaleUser + 1;
        this.report.sumUser = this.report.sumUser + 1;
      }

      this.reportservice.updateReport(this.report).then((res: any) => {

        if (res.success)
        this.toastCrt.create({
          message: `Update REPORT sucessfully`,
          duration: 2000
        }).present();

        else
          alert('Error' + res);
      })

    }

  }


  // This code for load report of number of user from social network

  loadreport() {
    this.reportservice.report().then((res: any) => {
      this.report = res;
    })
  }

  //Khai bao cac thanh pho
  initializeCity() {
    this.citys = [
      { id: 1, name: 'Seoul' },
      { id: 2, name: 'Gyeonggi' },
      { id: 3, name: 'Incheon' },
      { id: 4, name: 'Daejeon' },
      { id: 5, name: 'Daegu' },
      { id: 6, name: 'Busan' },
      { id: 7, name: 'Gwangju' },
      { id: 8, name: 'Sejong' },
      { id: 9, name: 'Ulsan' },
      { id: 10, name: 'Chungbuk' },
      { id: 11, name: 'Chungnam' },
      { id: 12, name: 'Cheonbuk' },
      { id: 13, name: 'Chonnam' },
      { id: 14, name: 'Gyungbuk' },
      { id: 15, name: 'Gyungnam' },
      { id: 16, name: 'Gangwon' },
      { id: 17, name: 'Jeju' },
      { id: 18, name: 'NorthKorea' },
      { id: 19, name: 'Foreigner' },];

  }

  // Khai bao cac quan li
  initializeDistrict() {
    this.districts = [
      //  list of districts of Seoul https://en.wikipedia.org/wiki/List_of_districts_of_Seoul
      { id: 1, name: 'Gangnam-gu', city_id: 1, city_name: 'Seoul' },
      { id: 2, name: 'Gangdong-gu', city_id: 1, city_name: 'Seoul' },
      { id: 3, name: 'Gangbuk-gu', city_id: 1, city_name: 'Seoul' },
      { id: 4, name: 'Gangseo-gu', city_id: 1, city_name: 'Seoul' },
      { id: 5, name: 'Gwanak-gu', city_id: 1, city_name: 'Seoul' },
      { id: 6, name: 'Gwangjin-gu ', city_id: 1, city_name: 'Seoul' },
      { id: 7, name: 'Guro-gu', city_id: 1, city_name: 'Seoul' },
      { id: 8, name: 'Geumcheon-gu', city_id: 1, city_name: 'Seoul' },
      { id: 9, name: 'Nowon-gu', city_id: 1, city_name: 'Seoul' },
      { id: 10, name: 'Dobong-gu', city_id: 1, city_name: 'Seoul' },
      { id: 11, name: 'Dongdaemun-gu', city_id: 1, city_name: 'Seoul' },
      { id: 12, name: 'Dongjak-gu ', city_id: 1, city_name: 'Seoul' },
      { id: 13, name: 'Mapo-gu', city_id: 1, city_name: 'Seoul' },
      { id: 14, name: 'Seodaemun-gu', city_id: 1, city_name: 'Seoul' },
      { id: 15, name: 'Seocho-gu', city_id: 1, city_name: 'Seoul' },
      { id: 16, name: 'Seongdong-gu', city_id: 1, city_name: 'Seoul' },
      { id: 17, name: 'Seongbuk-gu', city_id: 1, city_name: 'Seoul' },
      { id: 18, name: 'Songpa-gu', city_id: 1, city_name: 'Seoul' },
      { id: 19, name: 'Yangcheon-gu', city_id: 1, city_name: 'Seoul' },
      { id: 20, name: 'Yeongdeungpo-gu', city_id: 1, city_name: 'Seoul' },
      { id: 21, name: 'Yongsan-gu', city_id: 1, city_name: 'Seoul' },
      { id: 22, name: 'Eunpyeong-gu', city_id: 1, city_name: 'Seoul' },
      { id: 23, name: 'Jongno-gu ', city_id: 1, city_name: 'Seoul' },
      { id: 24, name: 'Jung-gu', city_id: 1, city_name: 'Seoul' },
      { id: 25, name: 'Jungnang-gu', city_id: 1, city_name: 'Seoul' },
      { id: 26, name: 'Others', city_id: 1, city_name: 'Seoul' },

      // List of disticts of 

      // List of districts of Gwangju https://en.wikipedia.org/wiki/List_of_districts_of_Gwangju
      { id: 27, name: 'Gwangsan-gu', city_id: 7, city_name: 'Gwangju' },
      { id: 28, name: 'Nam-gu', city_id: 7, city_name: 'Gwangju' },
      { id: 29, name: 'Dong-gu', city_id: 7, city_name: 'Gwangju' },
      { id: 30, name: 'Buk-gu', city_id: 7, city_name: 'Gwangju' },
      { id: 31, name: 'Seo-gu', city_id: 7, city_name: 'Gwangju' },
      { id: 31, name: 'Others', city_id: 7, city_name: 'Gwangju' },


      // List of districts of Busan https://en.wikipedia.org/wiki/List_of_districts_in_South_Korea

      { id: 32, name: 'Gangseo-gu', city_id: 3, city_name: 'Busan' },
      { id: 33, name: 'Geumjeong-gu', city_id: 3, city_name: 'Busan' },
      { id: 34, name: 'Gijang-gu', city_id: 3, city_name: 'Busan' },
      { id: 35, name: 'Nam-gu', city_id: 3, city_name: 'Busan' },
      { id: 36, name: 'Dong-gu', city_id: 3, city_name: 'Busan' },
      { id: 37, name: 'Dongnae-gu', city_id: 3, city_name: 'Busan' },
      { id: 38, name: 'Busanjin-gu', city_id: 3, city_name: 'Busan' },
      { id: 39, name: 'Buk-gu', city_id: 3, city_name: 'Busan' },
      { id: 40, name: 'Sasang-gu', city_id: 3, city_name: 'Busan' },
      { id: 41, name: 'Saha-gu', city_id: 3, city_name: 'Busan' },
      { id: 42, name: 'Seo-gu', city_id: 3, city_name: 'Busan' },
      { id: 43, name: 'Suyeong-gu', city_id: 3, city_name: 'Busan' },
      { id: 44, name: 'Yeonje-gu', city_id: 3, city_name: 'Busan' },
      { id: 45, name: 'Yeongdo-gu', city_id: 3, city_name: 'Busan' },
      { id: 46, name: 'Jung-gu', city_id: 3, city_name: 'Busan' },
      { id: 47, name: 'Haeundae-gu', city_id: 3, city_name: 'Busan' },
      { id: 48, name: 'Others', city_id: 3, city_name: 'Busan' },

      // List of districts of Incheon https://en.wikipedia.org/wiki/List_of_districts_in_South_Korea

      { id: 49, name: 'Bupyeong-gu', city_id: 6, city_name: 'Incheon' },
      { id: 50, name: 'Dong-gu', city_id: 6, city_name: 'Incheon' },
      { id: 51, name: 'Gyeyang-gu', city_id: 6, city_name: 'Incheon' },
      { id: 52, name: 'Jung-gu', city_id: 6, city_name: 'Incheon' },
      { id: 53, name: 'Name-gu', city_id: 6, city_name: 'Incheon' },
      { id: 54, name: 'Namdong-gu', city_id: 6, city_name: 'Incheon' },
      { id: 55, name: 'Seo-gu', city_id: 6, city_name: 'Incheon' },
      { id: 56, name: 'Yeonsu-gu', city_id: 6, city_name: 'Incheon' },

      // List of districts of Daegu https://en.wikipedia.org/wiki/List_of_districts_in_South_Korea

      { id: 57, name: 'Jung-gu', city_id: 5, city_name: 'Daegu' },
      { id: 58, name: 'Dong-gu', city_id: 5, city_name: 'Daegu' },
      { id: 59, name: 'Seo-gu', city_id: 5, city_name: 'Daegu' },
      { id: 60, name: 'Nam-gu', city_id: 5, city_name: 'Daegu' },
      { id: 61, name: 'Buk-gu', city_id: 5, city_name: 'Daegu' },
      { id: 62, name: 'Suseong-gu', city_id: 5, city_name: 'Daegu' },
      { id: 63, name: 'Dalseo-gu', city_id: 5, city_name: 'Daegu' },

      // List of districts of Daejeon https://en.wikipedia.org/wiki/List_of_districts_in_South_Korea

      { id: 64, name: 'Daedeok-gu', city_id: 4, city_name: 'Daejeon' },
      { id: 65, name: 'Dong-gu', city_id: 4, city_name: 'Daejeon' },
      { id: 66, name: 'Jung-gu', city_id: 4, city_name: 'Daejeon' },
      { id: 67, name: 'Seo-gu', city_id: 4, city_name: 'Daejeon' },
      { id: 68, name: 'Yuseong-gu', city_id: 4, city_name: 'Daejeon' },

      // List of districts of { id: 19, name: 'Foreigner' }, https://en.wikipedia.org/wiki/List_of_districts_in_South_Korea

      { id: 69, name: 'Vietnam', city_id: 19, city_name: 'Foreigner' },
      { id: 70, name: 'France', city_id: 19, city_name: 'Foreigner' },
      { id: 71, name: 'USA', city_id: 19, city_name: 'Foreigner' },
      { id: 72, name: 'Taiwan', city_id: 19, city_name: 'Foreigner' },
      { id: 73, name: 'Russia', city_id: 19, city_name: 'Foreigner' },
       


    ];


  }

  setDistrictValues(sCity) {
    this.selectedDistricts = this.districts.filter(district => district.city_id == sCity.id);
    //this.profile.city = sCity.name;
    this.profile.city = sCity;
    console.log(this.profile.city)

  }

  togleBackgroundFrom1() {
    this.selectedBackground = true;
  }

  togleBackgroundFrom2() {
    this.selectedBackground = false;
  }

  selectGender(a: any) {
    if (a == 1) {
      // code...
      this.profile.gender = "male";
      this.selectedFemale = false;
      this.selectedMale = true;


    } else {
      // code...
      this.profile.gender = "female";
      this.selectedMale = false;
      this.selectedFemale = true;
    }

  }

  selectTarget(a: any) {
    if (a == 1) {
      // code...
      this.profile.target = "marriage";



    } else {
      // code...
      this.profile.target = "re-marriage";

    }

  }

  string2Age() {

    if (!(this.profile.age == null)) {
      // code...
      this.profile.birth = this.year - parseInt(this.profile.age.substring(0, 4));
      console.log(this.profile.birth);
      this.profile.zodiac = this.userservice.birth2zodiac(this.profile.age);
    }

  }

  // birth2zodiac(): string {

  //       // this code use to covert date to Zodiac for each user
  //       let tempt: number;
  //       let zodiac: string;
  //       tempt = parseInt((this.profile.age.substr(5, 2).concat(this.profile.age.substr(8, 2))));
  //       if (120 <= tempt && tempt <= 218 ) {

  //         zodiac = './assets/imgs/horoscope/aquarius-zodiac-sign-symbol256.png';

  //       } else if (219 <= tempt && tempt <= 320) {

  //         zodiac = './assets/imgs/horoscope/pisces-zodiac-sign256.png';

  //       } else if (321 <= tempt && tempt <= 419) {

  //         zodiac = './assets/imgs/horoscope/aries-bull-head-front-shape-symbol256.png';

  //       } else if (420 <= tempt && tempt <= 520) {

  //         zodiac = './assets/imgs/horoscope/taurus-bull-head-symbol-for-zodiac256.png';

  //       } else if (521 <= tempt && tempt <= 620) {

  //         zodiac = './assets/imgs/horoscope/gemini-twins-symbol256.png';

  //       } else if (621 <= tempt && tempt <= 722) {

  //         zodiac = './assets/imgs/horoscope/cancer256.png';

  //       } else if (723 <= tempt && tempt <= 822) {

  //         zodiac = './assets/imgs/horoscope/leo-astrological-sign256.png';

  //       } else if (823 <= tempt && tempt <= 922) {

  //         zodiac = './assets/imgs/horoscope/virgo-woman-head-shape-symbol256.png';

  //       } else if (923 <= tempt && tempt <= 1022) {

  //         zodiac = './assets/imgs/horoscope/libra-balanced-scale-symbol256.png';

  //       } else if (1023 <= tempt && tempt <= 1121) {

  //         zodiac = './assets/imgs/horoscope/scorpion-shape256.png';

  //       } else if (1122 <= tempt && tempt <= 1221) {

  //         zodiac = './assets/imgs/horoscope/sagittarius-sign256.png';
  //       } else {

  //         zodiac = './assets/imgs/horoscope/capricorn-astrological-sign-of-head-black-silhouette-with-horns256.png';      

  //       } 

  //       return zodiac;
  // }    


}
