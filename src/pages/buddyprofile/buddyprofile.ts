import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, Modal, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database-deprecated'
import { Observable } from 'rxjs/Observable';

import { Profile } from "../../models/profile";
import { Fullprofile } from '../../models/fullprofile';

import firebase from 'firebase';
import { UserProvider } from '../../providers/user/user';
import { City } from "../../models/profile";
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the BuddyprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buddyprofile',
  templateUrl: 'buddyprofile.html',
})
export class BuddyprofilePage {

  public myProfile: AngularFireObject<Profile>
  public myProfile_: Observable<Profile>;

  myUser = {} as Fullprofile;
  my_Profile = {} as Profile;
  my_City = {} as City;
  hiddenHoroscope: boolean = true;

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

  buddyuid: string;



  constructor(public navCtrl: NavController, public navParams: NavParams,
    private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase,
    public userservice: UserProvider, private toast: ToastController, public zone: NgZone) {

    this.buddyuid = this.navParams.get('buddyUid');
    //this.loaduserdetails(this.buddyuid);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuddyprofilePage');
    //this.loadbuddyfromUid(this.buddyuid);

  }



  ionViewWillEnter() {

    this.loaduserdetails(this.buddyuid);
    console.log('ionViewDidLoad MyPage');
    //  this.loadbuddyfromUid(this.buddyuid);




  }

  loaduserdetails(uid: string) {
    this.userservice.getbuddydetails(uid).then((res: any) => {
      this.displayName = res.displayName;
      // this.my_Profile = res.profile;

      this.zone.run(() => {
        //this.imgSourceAvar = res.photoURL;
        this.myUser = res;
        this.my_Profile = res.profile;
        this.my_City = this.my_Profile.city;
        console.log(this.myUser.profile.city);

        this.my_Profile.beviewed = this.my_Profile.beviewed + 1;

        this.userservice.addfulluser2(this.my_Profile, this.my_Profile.photoURL, uid).then((res: any) => {

          if (res.success)

            this.toast.create({
              message: `Update beviewed sucessfully`,
              duration: 2000
            }).present();

          else
            alert('Error' + res);
        })


      })
    })
  }

      /**
  Loading profile of user when we click on avatar on the Home page
  Called from - buddyprofile.ts
  Inputs - uid : ID of user
  Outputs - Profile of specificed user

   */


  loadbuddyfromUid(uid: string) {

    this.loaduserdetails(uid);

    this.uid = uid;
    // console.log(this.uid)


    this.myProfile = this.afDatabase.object(`profile/uid`)
    //   const cours$= this.afDatabase.object(`profile/${data.uid}`);
    // cours$.subcrible(console.log());
    this.myProfile_ = this.myProfile.valueChanges();
    //this.a =this.myProfile;


    // console.log(this.myProfile_);

    //this.getMyURL();
    //console.log(this.myProfile_);




  }

      /**
  This function for visible or hidden the horoscope
  Called from - buddyprofile.ts
  Inputs - NULL
  Outputs - Visualization

   */

  clickAvarOfBuddy() {
    this.hiddenHoroscope = !this.hiddenHoroscope;

  }

      /**
  Close function
  Called from - buddyprofile.ts
  Inputs - NULL
  Outputs - returen the Tab Page

   */

  closeModal(){
  
    this.navCtrl.setRoot(TabsPage);
    //this.navCtrl.parent.select(2);

  }

    /**
  Update the number of like for user
  Called from - buddyprofile.ts
  Inputs - NULL
  Outputs - promise

   */

  setLike(){
    this.my_Profile.beliked = this.my_Profile.beliked + 1;

    this.userservice.addfulluser2(this.my_Profile, this.my_Profile.photoURL, this.buddyuid).then((res: any) => {

      if (res.success)

        this.toast.create({
          message: `Update beLiked sucessfully`,
          duration: 2000
        }).present();

      else
        alert('Error' + res);
    })


  }



}
