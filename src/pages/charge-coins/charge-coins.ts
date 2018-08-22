import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StripeNativePage } from '../stripe-native/stripe-native';

/**
 * Generated class for the ChargeCoinsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-charge-coins',
  templateUrl: 'charge-coins.html',
})
export class ChargeCoinsPage {

  selectedAmount: number = 100;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChargeCoinsPage');
  }

  openPayment(){
    this.navCtrl.push(StripeNativePage, {amount: this.selectedAmount})
  
  }

}
