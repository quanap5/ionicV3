import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Preference } from '../../models/preference';

/**
 * Generated class for the PreferenceSub3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-preference-sub3',
  templateUrl: 'preference-sub3.html',
})
export class PreferenceSub3Page {
  data2: Preference;
  showme= {
    man: false,
    woman: false,
    single: false,
    notSingle: false,
    haveChildren: true,
    haveNoChildren: false,
    petCat: false,
    petDog: false
  };

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
