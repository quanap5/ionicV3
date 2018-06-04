import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from "angularfire2/auth";
import { UserProvider } from '../../providers/user/user';
import { TranslateService } from '@ngx-translate/core';
import { ProfilepicPage } from '../profilepic/profilepic';


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
  newuser= {} as User;

  constructor(private afAuth: AngularFireAuth, private toastCtrl: ToastController, private loadingCrt: LoadingController,
    public userservice: UserProvider, public loadingCtrl: LoadingController, 
    public navCtrl: NavController, public navParams: NavParams,
    private translate: TranslateService) {
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
	  	this.navCtrl.setRoot('ProfilePage');// code version1
      //this.navCtrl.setRoot('ProfilepicPage'); // new code
	  }
	  catch (e) {
	  	console.error(e);
	  }


  	  }

	

  }



  /*
  This code is for signup using user service version2

  */


  signup() {
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    if (this.user.email == '' || this.user.password == '' || this.user.type == '') {
      toaster.setMessage('All fields are required dude');
      toaster.present();
    }
    else if (this.user.password.length < 6) {
      toaster.setMessage('Password is not strong. Try giving more than six characters');
      toaster.present();
    }
    else {
      let loader = this.loadingCtrl.create({
        content: 'Please wait'
      });
      loader.present();
      this.userservice.adduser(this.user).then((res: any) => {
        loader.dismiss();
        if (res.success)
          this.navCtrl.setRoot( ProfilepicPage , {init_user: this.user});
        //this.navCtrl.setRoot('ProfilePage');

        else
          alert('Error' + res);
      })
    }
  }  

}
