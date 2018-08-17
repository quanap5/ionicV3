import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Preference } from '../../models/preference';

/**
 * Generated class for the PreferenceSub5Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-preference-sub5',
  templateUrl: 'preference-sub5.html',
})
export class PreferenceSub5Page {
  data2: Preference;

  smoke: any = {lower: 1, upper: 1};
  drink: any = {lower: 1, upper: 1};
  drug: any = {lower: 1, upper: 1};

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
