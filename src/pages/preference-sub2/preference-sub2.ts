import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Preference } from '../../models/preference';

/**
 * Generated class for the PreferenceSub2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-preference-sub2',
  templateUrl: 'preference-sub2.html',
})
export class PreferenceSub2Page {

  data2: Preference;

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
    this.data2=navParams.get('data2')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreferenceSub2Page');
  }

  closeModal(){
  
  	this.view.dismiss(this.data2);

  }


}
