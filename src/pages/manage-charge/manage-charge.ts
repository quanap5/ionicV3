import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChargeCoinsPage } from '../charge-coins/charge-coins';
import { PaymentProvider } from '../../providers/payment/payment';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the ManageChargePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage-charge',
  templateUrl: 'manage-charge.html',
})
export class ManageChargePage {

  appType = 'Available Items';
  
  apps: any = {
    'Available Items': [
      {
        name: 'CLICK NORMAL PROFILE',
        price: '4'
      },
      {
        name: 'SENDING GIFT',
        price: '3'
      },
      {
        name: 'SENDING MONEY',
        price: '1'
      },
      {
        name: 'BLOCK',
        price: '12'
      },
      {
        name: 'CLICK SECRET PROFILE',
        price: '2'
      }
    ],
   
    'My Account': [
      {
        name: 'Spotify',
        price: 'OPEN'
      },
      {
        name: 'Pandora',
        price: 'GET'
      }
    ]
  };
  
  historyofTrans: any;
 
  balanceCoin: any;

  

  constructor(public navCtrl: NavController, public navParams: NavParams, public payment: PaymentProvider, public userservice: UserProvider) {

    this.payment.getmyTransaction().then((res: any) => {
      this.historyofTrans = res;
      
    })

    this.userservice.getMydetails().then((res: any) => {
  
      //this.myUser = res;
     this.balanceCoin = res.profile.coin;
      
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageChargePage');
  }

  getItems(type: any) {
    return this.apps[type];
  }

  openPaymentSelection(){
    this.navCtrl.push(ChargeCoinsPage);
  }

 

}
