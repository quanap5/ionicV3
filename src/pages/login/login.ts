import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from 'angularfire2/auth';
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
   constructor(private afAuth: AngularFireAuth, private toastCrt: ToastController,
     public navCtrl: NavController, public navParams: NavParams) {
   }




   async login(user: User){
     try {
       const result= this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
       console.log(result);
       if (result) {
         
         //this.navCtrl.setRoot('HomePage');
         this.navCtrl.setRoot('TabsPage');
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

   register(){
     this.navCtrl.push('RegisterPage');
     //this.navCtrl.setRoot('HomePage');
     
   }

   passwordreset(){
     this.navCtrl.push('PasswordresetPage')
     //this.navCtrl.push('TabsPage')
   }

   
 }
