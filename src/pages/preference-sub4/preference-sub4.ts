import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Preference } from '../../models/preference';

/**
 * Generated class for the PreferenceSub4Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-preference-sub4',
  templateUrl: 'preference-sub4.html',
})
export class PreferenceSub4Page {
  data2: Preference;
  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {

    this.data2=navParams.get('data2')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreferenceSub3Page');
  }

  closeModal(){
  
  	this.view.dismiss(this.data2);

  }
}
