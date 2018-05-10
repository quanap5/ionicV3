import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from "angularfire2/auth";


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

	user = {}  as User;

  constructor(private afAuth: AngularFireAuth, private toastCtrl: ToastController, private loadingCrt: LoadingController,
  	public navCtrl: NavController, public navParams: NavParams) {
  }


  async register(user: User){
  	 // this.navCtrl.setRoot('ProfilePage');

  	  var toaster = this.toastCtrl.create({
  	  	duration: 4000,
  	  	position: 'bottom'
  	  });

  	  if (user.email =='' || user.password == '' || user.type ==''
        || user.password == null ) { 
  	  	// code...
  	  	toaster.setMessage('All field should be not blank');
  	  	toaster.present();

  	  } else if (user.password.length<6) { 
  	  	// code...
  	  	toaster.setMessage('Password is not strong. Try more than six characters');
  	  	toaster.present();
  	  } else {
  	  	// code...
  	  	// let loader = this.loadingCrt.create({
  	  	// 	content: 'Please wait ...'

  	  	// });
  	  	// loader.present();

  	  	  try {
	  	const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email+'@'+user.type, user.password);
	  	console.log(result);
	  	this.navCtrl.setRoot('ProfilePage');
	  }
	  catch (e) {
	  	console.error(e);
	  }


  	  }

	

  }

}
