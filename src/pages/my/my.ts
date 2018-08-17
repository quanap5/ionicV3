import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, Modal, AlertController, ModalOptions, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable';
import { Profile, UserProfile } from "../../models/profile";
import { Fullprofile } from '../../models/fullprofile'
import * as _ from 'lodash';
import 'rxjs/add/operator/filter'
import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage, initializeApp } from 'firebase';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { PreferencePage } from "../../pages/preference/preference"

import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { UserProvider } from '../../providers/user/user';
import firebase from 'firebase';

import { City } from "../../models/profile";
import { ProfileEditPage } from '../profile-edit/profile-edit';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';
import { ParseLocation } from '@angular/compiler';





/**
 * Generated class for the MyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my',
  templateUrl: 'my.html',
})
export class MyPage {
  // public myProfile: AngularFireObject<Profile>

  // public myProfile_: Observable<Profile>;
  public a: Profile;

  public gender: any;
  private uid: string;
  //imgSourceAvar = 'https://firebasestorage.googleapis.com/v0/b/fir-auth-d753b.appspot.com/o/profileimages%2FISpk8HGedqYbdp8GKV8tq8SRduy1?alt=media&token=3ec6899a-fe42-49ca-988c-e32887bdb15c';
  imgSourceAvar: string;
  imgSourceImg = "assets/imgs/unknown.png";
  //  vidu slide image
  images = ['1', '2', '3', '4'];


  avatar: string;
  displayName: string = 'nickname';

  firestore = firebase.storage();
  myUser = {};
  my_Profile = {} as Profile;
  my_City = {} as City;

  dis_FromSeoul: any;



  constructor(private camera: Camera, private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, private toast: ToastController,
    private modal: ModalController,
    public navCtrl: NavController, public navParams: NavParams,
    public userservice: UserProvider, public zone: NgZone, public alertCtrl: AlertController,
    public imghandler: ImghandlerProvider,
    public loadingCtrl: LoadingController) {

    //this.a = navParams.get('currentProfile');
    //this.loaduserdetails();

    //console.log(this.a);
  }



  ionViewDidLoad() {

    this.loaduserdetails(); // load detailed profile of my user



    // this part is version 1 very tu toi thay boi service of user --> pro hon

    // console.log('ionViewDidLoad MyPage');
    // this.afAuth.authState.subscribe(data => {
    //   if (data && data.email && data.uid) {
    //     this.toast.create({
    //       message: `Welcome to APP_Name, ${data.email} and ${data.uid}`,
    //       duration: 3000
    //     }).present();
    //     this.uid = data.uid;
    //     console.log(this.uid)


    //     this.myProfile = this.afDatabase.object(`profile/${data.uid}`)
    //     //   const cours$= this.afDatabase.object(`profile/${data.uid}`);
    //     // cours$.subcrible(console.log());
    //     this.myProfile_ = this.myProfile.valueChanges();
    //     //this.a =this.myProfile;


    //     //console.log(this.myProfile_);

    //     //this.getMyURL();
    //     //console.log(this.myProfile_);




    //   } else {
    //     this.toast.create({
    //       message: `Could not LOGIN wrong email or password`,
    //       duration: 3000
    //     }).present();
    //   }

    // });
  }

  /**
   * called from in this file
   * Input - None
   * Output - update class variable named myuser
   */

  loaduserdetails() {

    // let loader = this.loadingCtrl.create({
    //   content: 'Please wait'
    // })
    this.userservice.getMydetails().then((res: any) => {
      //this.displayName = res.displayName;
      // this.my_Profile = res.profile;
      this.myUser = res;
      // console.log(res.profile)

      this.zone.run(() => {
        //this.imgSourceAvar = res.photoURL;

        this.my_Profile = res.profile;
        this.my_City = this.my_Profile.city;
        //console.log(this.my_Profile.city.name);

       
        this.dis_FromSeoul = this.distance(this.my_Profile.latitude, this.my_Profile.longtitude, 37.5665, 126.9780, 'K')
      })

    })
  }




  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad MyPage');
  //   this.afAuth.authState.subscribe(data => {
  //   	if (data && data.email && data.uid) { 
  //   		this.toast.create({
  //   		message: `Welcome to APP_Name, ${data.email} and ${data.uid}`,
  //   		duration: 3000
  //   	}).present();
  //       this.uid=data.uid;


  //   		this.myProfile = this.afDatabase.object(`profile/${data.uid}`)
  //     //   const cours$= this.afDatabase.object(`profile/${data.uid}`);
  //   		// cours$.subcrible(console.log());
  //   		this.myProfile_ = this.myProfile.valueChanges();
  //       //this.a =this.myProfile;


  //       //console.log(this.myProfile_);

  //       this.getMyURL();
  //      //console.log(this.myProfile_);




  //   	} else {
  //   		this.toast.create({
  //   		message: `Could not LOGIN wrong email or password`,
  //   		duration: 3000
  //   	}).present();
  //   	}

  //   });
  // }

  // ionViewWillLoad(){
  //    this.getMyURL();
  // }


  /**
   * Capture image when click avatar
   * Called from from this page my.ts
   * Input - None
   * output - image
   */

  async takephoto() {
    //define camera options
    try {
      const options: CameraOptions = {
        quality: 50,
        targetHeight: 300,
        targetWidth: 300,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
      }

      const result = await this.camera.getPicture(options);
      const image = `data:image/jpeg;base64,${result}`;

      const pictures = storage().ref('profileimages/' + firebase.auth().currentUser.uid + '/avatar.png');
      pictures.putString(image, 'data_url');


      // this.zone.run(() => {
      // this.getMyURL();  
      // this.loaduserdetails();   })
      this.getMyURL();
      this.loaduserdetails();
      this.navCtrl.setRoot(TabsPage);

      // this.zone.run(() => {
      //   this.navCtrl.setRoot(TabsPage);

      // })


    }
    catch (e) {
      console.error(e);
    }
  }


  // useing take photoProvider//

  takephotoFromProvider() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    })
    loader.present();
    this.imghandler.takephotoProvider();
      loader.dismiss();
      this.zone.run(() => {
        this.getMyURL();
        this.loaduserdetails();
        this.navCtrl.setRoot(TabsPage);
      
    })
  }

  //  use for updateing URL of avatar
  getMyURL() {
    storage().ref().child('profileimages/' + firebase.auth().currentUser.uid + '/avatar.png').getDownloadURL().then((url) => {
      //this.imgSourceAvar = url;
      this.userservice.updateimage(url);
      //this.loaduserdetails();
    })

  }

  /**
   * this is used in upload profile image from 1 index to 4 index
   * input - index
   * output image of profile
   */

  async takephoto1(index: string) {
    //define camera options
    try {
      const options: CameraOptions = {
        quality: 100,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
      }

      const result = await this.camera.getPicture(options);
      const image = `data:image/jpeg;base64,${result}`;

      const pictures = storage().ref('profileimages/' + firebase.auth().currentUser.uid + '/' + index + '.png');
      pictures.putString(image, 'data_url');

      // this.zone.run(() => {
      // this.getMyURL();  
      // this.loaduserdetails();   })
      this.getMyURL1(index);
      this.updatenoPhoto(firebase.auth().currentUser.uid);

      this.loaduserdetails();
      this.navCtrl.setRoot(TabsPage);


    }
    catch (e) {
      console.error(e);
    }
  }


  // Update profile image Url to firebase
  getMyURL1(index: string) {
    storage().ref().child('profileimages/' + firebase.auth().currentUser.uid + '/' + index + '.png').getDownloadURL().then((url) => {
      //this.imgSourceAvar = url;
      this.userservice.updateimage1(url, index);
      //this.loaduserdetails();
    })

  }



  // async upload_Image(index: string) {
  //   //define camera options
  //   try {
  //     const options: CameraOptions = {
  //       quality: 50,
  //       targetHeight: 300,
  //       targetWidth: 300,
  //       destinationType: this.camera.DestinationType.DATA_URL,
  //       encodingType: this.camera.EncodingType.JPEG,
  //       mediaType: this.camera.MediaType.PICTURE,
  //       correctOrientation: true
  //     }

  //     const result = await this.camera.getPicture(options);
  //     const image = `data:image/jpeg;base64,${result}`;
  //     const pictures = storage().ref('profileimages/' + this.uid + '/' + index + '.png');
  //     pictures.putString(image, 'data_url')
  //     this.getMyURLImage(index);
  //   }
  //   catch (e) {
  //     console.error(e);
  //   }
  // }



  getMyURLImage(index: string) {
    storage().ref().child('profileimages/' + this.uid + '/' + index + '.png').getDownloadURL().then((url) => {
      this.imgSourceImg = url;
      console.log(this.imgSourceImg)
    })

    //this.imgSourceImg="'gs://fir-auth-d753b.appspot.com/picture/'+this.uid+'/'";
  }


  prefer_Setting() {
    //this.navCtrl.push(PreferencePage, {data1: this.myProfile_});
    const myModal = this.modal.create(PreferencePage, { data1: this.myUser });
    myModal.present();
    myModal.onDidDismiss((data) => {
      console.log(data)

    })

  }


  edit_Profile() {
    this.navCtrl.push(ProfileEditPage, { current_profile: this.myUser });
  }

  /*
  code for edit username when user toch the username on my page
  */

  editname() {
    let statusalert = this.alertCtrl.create({
      buttons: ['okay']
    });
    let alert = this.alertCtrl.create({
      title: 'Edit Nickname',
      inputs: [{
        name: 'nickname',
        placeholder: 'Nickname'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: data => {

        }
      },
      {
        text: 'Edit',
        handler: data => {
          if (data.nickname) {
            this.userservice.updatedisplayname(data.nickname).then((res: any) => {
              if (res.success) {
                statusalert.setTitle('Updated');
                statusalert.setSubTitle('Your nickname has been changed successfully!!');
                statusalert.present();
                this.zone.run(() => {
                  //this.displayName = data.nickname;
                  this.loaduserdetails();

                })

                //version2

              }

              else {
                statusalert.setTitle('Failed');
                statusalert.setSubTitle('Your nickname was not changed');
                statusalert.present();
              }

            })
          }
        }

      }]
    });
    alert.present();
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.navCtrl.parent.parent.setRoot(LoginPage);
    })
  }

/**function to calculate distance */

  distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
  }

  updatenoPhoto(uid: string){

        
    // this.userservice.updatenoPhoto_Provider(uid).then((res_: any) => {
    //   this.my_Profile.noPhoto = res_;
    //   //console.log(this.filteredusers);
    // }); fir-auth-d753b.appspot.com

    this.my_Profile.noPhoto = 0; // reset and check it again

    if (this.my_Profile.profileURL1.indexOf("profileimages") !=-1 )   
      this.my_Profile.noPhoto =  this.my_Profile.noPhoto+1;

    if (this.my_Profile.profileURL2.indexOf("profileimages") !=-1 )   
      this.my_Profile.noPhoto =  this.my_Profile.noPhoto+1;
    
    if (this.my_Profile.profileURL3.indexOf("profileimages")  !=-1)   
      this.my_Profile.noPhoto =  this.my_Profile.noPhoto+1;
    
    if (this.my_Profile.profileURL4.indexOf("profileimages") !=-1 )   
      this.my_Profile.noPhoto =  this.my_Profile.noPhoto+1;




    this.userservice.addfulluser(this.my_Profile, this.my_Profile.photoURL).then((res: any) => {

      if (res.success)
      //  this.navCtrl.setRoot(TabsPage);
      //this.navCtrl.setRoot('ProfilePage');
      {

      }

      else
        alert('Error' + res);
    })

  }



}
