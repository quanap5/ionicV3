import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from "../../models/profile";
import { AngularFireDatabase } from 'angularfire2/database';

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

  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, private toastCrt: ToastController,
  	public navCtrl: NavController, public navParams: NavParams) {
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
      this.profile.education== '' || this.profile.education == null ||
      this.profile.city == '' || this.profile.city == null) { 
      // code...
      toaster.setMessage('All fields should be not blank');
      toaster.present();

    } else  {
      // code...
        this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
      .then(() => this.navCtrl.setRoot('TabsPage'));

    })
    
    } 


  
  }

}
