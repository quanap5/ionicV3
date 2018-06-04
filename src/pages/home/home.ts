import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable'
//import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Profile } from "../../models/profile";
import * as _ from 'lodash';
import 'rxjs/add/operator/filter';

import { UserProvider } from '../../providers/user/user';
import { RequestsProvider } from '../../providers/requests/requests';
import { connreq } from '../../models/request';
import firebase from 'firebase';

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
  f_city: string ="all";
  f_education: string ="all";

  /// Active filter

  filters = {}


  newrequest = {} as connreq;
  temparr = [];
  filteredusers = [];

  filterprofiles= [] ;


  fireprofiles = firebase.database().ref('/profile');

  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, private toast: ToastController,
  	public navCtrl: NavController, public navParams: NavParams,
    public userservice: UserProvider, public alertCtrl: AlertController,
    public requestservice: RequestsProvider) {

    this.profileListRef= this.afDatabase.list('/profile');
    //this.profileListRef.valueChanges().subscribe(data => console.log(data));
    this.profileitems = this.profileListRef.valueChanges();

   //console.log(this.profileitems);
    //this.profiles = this.profileitems;
    //this.applyFilters("marriage");
    // this.First();
    this.afDatabase.list('profile');
    this.initializeSearch_city();

    /////from source codo v2

     this.userservice.getallusers().then((res: any) => {
     this.filteredusers = res;
     console.log(this.filteredusers);
   })

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


  public applyFilters1____(f1: string, f2: string, f3: string){

    if (f1=="all") { 
      // code...
      this.profileListRef= this.afDatabase.list('/profile');
    //this.profileListRef.valueChanges().subscribe(data => console.log(data));
    this.profileitems = this.profileListRef.valueChanges();
  } else {
      // code...
      this.profileListRef= this.afDatabase.list('/profile',ref => ref.orderByChild('target').equalTo(f1));

      this.profileitems = this.profileListRef.valueChanges();  
      
      
    }
  }


  
  public applyFilters1(f1: string, f2: string){

      
    this.userservice.filterUsers(f1, f2).then((res: any) => {
      this.filteredusers = res;
      //this.temparr = res;
    })
   
  }

  

  public applyFilters2(f1: string, f2: string, f3: string){

    if (f2=="all") { 
      // code...
      this.profileListRef= this.afDatabase.list('/profile');
    //this.profileListRef.valueChanges().subscribe(data => console.log(data));
    this.profileitems = this.profileListRef.valueChanges();
  } else {
      // code...
      this.profileListRef= this.afDatabase.list('/profile',ref => ref.orderByChild('city').equalTo(f2));

      this.profileitems = this.profileListRef.valueChanges();  
      
      
    }

  }

  public applyFilters3(f1: string, f2: string, f3: string){

    if (f3=="all") { 
      // code...
      this.profileListRef= this.afDatabase.list('/profile');
    //this.profileListRef.valueChanges().subscribe(data => console.log(data));
    this.profileitems = this.profileListRef.valueChanges();
  } else {
      // code...
      this.profileListRef= this.afDatabase.list('/profile',ref => ref.orderByChild('education').equalTo(f3));

      this.profileitems = this.profileListRef.valueChanges();  
      
      
    }
    

  }

  /// filter property by equality to rule

  // filterExact(property: string, rule: any){

  //   this.filters[property] = val => val ==rule
  //   this.applyFilters() 
  // }

  

  ionViewDidLoad() {
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

initializeSearch_city(){
    this.search_citys = [
    {id: 1, name: 'Seoul'},
    {id: 2, name: 'Gyeonggi'},
    {id: 3, name: 'Incheon'},
    {id: 4, name: 'Daejeon'},
    {id: 5, name: 'Daegu'},
    {id: 6, name: 'Busan'},
    {id: 7, name: 'Gwangju'},
    {id: 8, name: 'Sejong'},
    {id: 9, name: 'Ulsan'},
    {id: 10, name: 'Chungbuk'},
    {id: 11, name: 'Chungnam'},
    {id: 11, name: 'Cheonbuk'},
    {id: 11, name: 'Chonnam'},
    {id: 11, name: 'Gyungbuk'},
    {id: 11, name: 'Gyungnam'},
    {id: 11, name: 'Gangwon'},
    {id: 11, name: 'Jeju'},
    {id: 11, name: 'NorthKorea'},
    {id: 11, name: 'Foreigner'},];

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


  gotobuddiProfile(key: string){

     this.navCtrl.push('BuddyprofilePage', {buddyUid: key })
  }

  debug(key: any){
    console.log(key);
    
  }




}
