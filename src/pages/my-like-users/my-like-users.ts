import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { RequestsProvider } from '../../providers/requests/requests';

/**
 * Generated class for the MyLikeUsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-like-users',
  templateUrl: 'my-like-users.html',
})
export class MyLikeUsersPage {

  mylikes: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public events: Events, public requestservice: RequestsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyInterestUsersPage');
  }

  ionViewWillEnter() {
    
    this.requestservice.getmylikes();

    this.events.subscribe('likes', () => {
      this.mylikes = [];
      this.mylikes = this.requestservice.mylikes; 
    })
  }


}
