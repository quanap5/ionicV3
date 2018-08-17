import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user'
import { LoginPage } from '../login/login';
import { TranslateService } from '@ngx-translate/core';
//import { User } from "../../models/user";




/**
 * Generated class for the PasswordresetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-passwordreset',
  templateUrl: 'passwordreset.html',
})
export class PasswordresetPage {
	email: string;

  constructor(//public uSer: User, public alertCtrl: AlertController,
    private translate: TranslateService,
  	public navCtrl: NavController, public navParams: NavParams,
    public userservice: UserProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordresetPage');
  }

 // reset the pass using email
 reset(){
   let alert = this.alertCtrl.create({
     buttons: ['OK']
   });

   this.userservice.passwordreset(this.email).then((res: any) => {
     if (res.success) { 
       // code...
       alert.setTitle('Email Sent');
       alert.setSubTitle('Please follow the instruction detailed in email');
     } else {
       // code...
       alert.setTitle('Failled');
     }
   })
 }



//  come back the login activity
  goback() {
    this.navCtrl.popToRoot();
  }


}
