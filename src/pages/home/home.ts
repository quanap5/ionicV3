import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable'
//import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Profile, City } from "../../models/profile";

import 'rxjs/add/operator/filter';

import { UserProvider } from '../../providers/user/user';
import { RequestsProvider } from '../../providers/requests/requests';
import { connreq } from '../../models/request';
import firebase from 'firebase';
import { BuddyprofilePage } from '../buddyprofile/buddyprofile';
import { AdditionalSearchPage } from '../additional-search/additional-search';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage {

  profileListRef: AngularFireList<Profile[]>;
  profileitems: Observable<any[]>;

  // Use for filtering
  public search_citys: any[];
  public sSearch_city: any;

  /// Unwrapped arrayy from firebase
  profiles: Observable<any[]>;
  filterEDProfile: Observable<any[]>;
  /// Filter-able property
  f_target: string = "all";
  f_city: string = "all";
  f_education: string = "all";

  /// Active filter

  filters = {}


  newrequest = {} as connreq;
  temparr = [];
  filteredusers = [];

  filterprofiles = [];

  dis_FromSeoul: any;
  disTance = [];

  fireprofiles = firebase.database().ref('/profile');

  firestore = firebase.storage();
  myUser = {};
  my_Profile2 = {} as Profile;
  my_City = {} as City;

  testRadioOpen = false;
  testRadioResult: any;


  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, private toast: ToastController,
    public navCtrl: NavController, public navParams: NavParams,
    public userservice: UserProvider, public zone: NgZone, public alertCtrl: AlertController,
    public requestservice: RequestsProvider,
    private toastCrt: ToastController) {

    this.profileListRef = this.afDatabase.list('/profile');
    //this.profileListRef.valueChanges().subscribe(data => console.log(data));
    this.profileitems = this.profileListRef.valueChanges();

    //console.log(this.profileitems);
    //this.profiles = this.profileitems;
    //this.applyFilters("marriage");
    // this.First();
    this.afDatabase.list('profile');
    this.initializeSearch_city();

    /////from source codo v2
    this.loaduserdetails();
    console.log("XXXXXXXXXXXXXXXXcacacaaXX:", this.my_Profile2.coin);




    //   this.userservice.getallprofiles('w2voD0eg8mRlq9OZm5KlgoGgPXM2').then((res: any) => {
    //   this.filterprofiles = res;

    // })

    //console.log(this.filteredusers);

  }



  // First(){
  //   this.afDatabase.list('profile').valueChanges().subscribe(profiles => {
  //     this.profiles = profiles;
  //     console.log(this.profiles);
  //     this.applyFilters()
  //   })

  // }


  // private applyFilters(){

  //   this.filterEDProfile = _.filter(this.profiles, _.conforms(this.filters))
  // }


  public applyFilters1____(f1: string, f2: string, f3: string) {

    if (f1 == "all") {
      // code...
      this.profileListRef = this.afDatabase.list('/profile');
      //this.profileListRef.valueChanges().subscribe(data => console.log(data));
      this.profileitems = this.profileListRef.valueChanges();
    } else {
      // code...
      this.profileListRef = this.afDatabase.list('/profile', ref => ref.orderByChild('target').equalTo(f1));

      this.profileitems = this.profileListRef.valueChanges();


    }
  }



  public applyFilters1(f1: string, f2: string, myPro: Profile) {


    this.userservice.filterUsers(f1, f2, myPro).then((res: any) => {
      this.filteredusers = res[0];
      this.disTance = res[1];
      //this.temparr = res;
    })

  }

  public applyFilters2(ref_Dist: number, myPro: Profile) {
    this.userservice.filterUserOnDist(ref_Dist, myPro).then((res: any) => {
      this.filteredusers = res[0];
      this.disTance = res[1];
      //this.temparr = res;
    })


  }



  public applyFilters4(f1: string, f2: string, f3: string) {

    if (f2 == "all") {
      // code...
      this.profileListRef = this.afDatabase.list('/profile');
      //this.profileListRef.valueChanges().subscribe(data => console.log(data));
      this.profileitems = this.profileListRef.valueChanges();
    } else {
      // code...
      this.profileListRef = this.afDatabase.list('/profile', ref => ref.orderByChild('city').equalTo(f2));

      this.profileitems = this.profileListRef.valueChanges();


    }

  }

  public applyFilters3(f1: string, f2: string, f3: string) {

    if (f3 == "all") {
      // code...
      this.profileListRef = this.afDatabase.list('/profile');
      //this.profileListRef.valueChanges().subscribe(data => console.log(data));
      this.profileitems = this.profileListRef.valueChanges();
    } else {
      // code...
      this.profileListRef = this.afDatabase.list('/profile', ref => ref.orderByChild('education').equalTo(f3));

      this.profileitems = this.profileListRef.valueChanges();


    }


  }

  /// filter property by equality to rule

  // filterExact(property: string, rule: any){

  //   this.filters[property] = val => val ==rule
  //   this.applyFilters() 
  // }

  ionViewWillLoad() {

  }



  ionViewDidLoad() {
    //this.loaduserdetails(); // load information of myuser
    // this.afAuth.authState.take(1).subscribe(data => {
    // 	if (data && data.email && data.uid) { 
    // 		this.toast.create({
    // 		message: `Welcome to APP_Name, ${data.email}`,
    // 		duration: 3000
    // 	}).present();

    // 		this.profileData = this.afDatabase.object(`profile/${data.uid}`)
    // 		console.log(this.profileData);
    // 	} else {
    // 		this.toast.create({
    // 		message: `Could not LOGIN wrong email or password`,
    // 		duration: 3000
    // 	}).present();
    // 	}

    // });
    // console.log(this.filteredusers)

  }

  initializeSearch_city() {
    this.search_citys = [
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
      { id: 11, name: 'Cheonbuk' },
      { id: 11, name: 'Chonnam' },
      { id: 11, name: 'Gyungbuk' },
      { id: 11, name: 'Gyungnam' },
      { id: 11, name: 'Gangwon' },
      { id: 11, name: 'Jeju' },
      { id: 11, name: 'NorthKorea' },
      { id: 11, name: 'Foreigner' },];

  }




  ///////////////////////////////////////////////////


  sendreq(recipient) {
    this.newrequest.sender = firebase.auth().currentUser.uid;
    this.newrequest.recipient = recipient.uid;
    if (this.newrequest.sender === this.newrequest.recipient)
      alert('You are your friend always');
    else {
      let successalert = this.alertCtrl.create({
        title: 'Request sent',
        subTitle: 'Your request was sent to ' + recipient.displayName,
        buttons: ['ok']
      });

      this.requestservice.sendrequest(this.newrequest).then((res: any) => {
        if (res.success) {
          successalert.present();
          let sentuser = this.filteredusers.indexOf(recipient);
          this.filteredusers.splice(sentuser, 1);
        }
      }).catch((err) => {
        alert(err);
      })
    }
  }


  gotobuddiProfile(key: string) {

    console.log("XXXXXXXXXXXXXXXXcacacaaXX2:", this.my_Profile2.coin);


    if (this.my_Profile2.coin > 0) {

      this.my_Profile2.coin = this.my_Profile2.coin - 5;
      this.userservice.addfulluser(this.my_Profile2, this.my_Profile2.photoURL).then((res: any) => {

        if (res.success)

          this.navCtrl.push(BuddyprofilePage, { buddyUid: key })

        else
          alert('Error' + res);
      })


    } else {
      this.toastCrt.create({
        message: `Your coin are not enough. You should buy coin`,
        duration: 3000
      }).present();

      this.doPaymentAlert();

      // if (parseInt(this.testRadioResult) != 0) {
      //   this.my_Profile2.coin = parseInt(this.testRadioResult);
      //   this.userservice.addfulluser(this.my_Profile2, this.my_Profile2.photoURL).then((res: any) => {

      //     if (res.success) {

      //       this.navCtrl.push(BuddyprofilePage, { buddyUid: key })

      //       this.toastCrt.create({
      //         message: `you have buy` + this.testRadioResult + `coin`,
      //         duration: 3000
      //       }).present(); }

      //     else
      //       alert('Error' + res);
      //   })

      // }
 
      // this.testRadioResult = '0';





    }

  }

  // Do payment here

  doPaymentAlert() {

    this.testRadioOpen = true;

    let alert = this.alertCtrl.create();
    alert.setTitle('Confirm the payment');

    alert.addInput({
      type: 'radio',
      label: 'Buy 1000 for 10 coins',
      value: '10'
    });

    alert.addInput({
      type: 'radio',
      label: 'Buy 3000 for 30 coins',
      value: '30'
    });

    alert.addInput({
      type: 'radio',
      label: 'Buy 5000 for 50 coins',
      value: '50',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Buy 10000 for 120 coins',
      value: '120'
    });

    alert.addInput({
      type: 'radio',
      label: 'Buy 15000 for 200 coins',
      value: '200'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        console.log('Radio data:', data);
        this.testRadioOpen = false;
        this.testRadioResult = data;
        this.my_Profile2.coin = parseInt(this.testRadioResult);
        this.userservice.addfulluser(this.my_Profile2, this.my_Profile2.photoURL);
        this.toastCrt.create({
                  message: `YOU HAVE JUST ` + this.testRadioResult + ` COINS`,
                  duration: 3000
                }).present();
    
        this.testRadioResult = '0';
      }
    });

    alert.present();



  }



  debug(key: any) {
    console.log(key);

  }

  /**This function used to calculate the distance between two points (given the latitude and longtitude) */

  distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "N") { dist = dist * 0.8684 }
    return dist
  }


  /**This function to load details user from home page */

  loaduserdetails() {

    this.userservice.getMydetails().then((res: any) => {
      this.myUser = res;
      this.my_Profile2 = res.profile;
      this.zone.run(() => {
        //this.imgSourceAvar = res.photoURL;

        // this.my_Profile2 = res.profile;
        this.my_City = this.my_Profile2.city;
        this.dis_FromSeoul = this.distance(this.my_Profile2.latitude, this.my_Profile2.longtitude, 37.5665, 126.9780, 'K')
      })


      this.userservice.getallusers(this.my_Profile2).then((res: any) => {
        this.filteredusers = res[0];
        this.disTance = res[1];
        //console.log(this.filteredusers);
      })

    })


  }

  // function to open additional search
  openAdditionalSearch(){
    this.navCtrl.push(AdditionalSearchPage);
  }


}
