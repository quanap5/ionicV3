import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { RequestsProvider } from '../../providers/requests/requests';

/**
 * Generated class for the MyInterestUsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-interest-users',
  templateUrl: 'my-interest-users.html',
})
export class MyInterestUsersPage {
  myinterests: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public events: Events, public requestservice: RequestsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyInterestUsersPage');
  }

  ionViewWillEnter() {
    
    this.requestservice.getmyinterest();

    this.events.subscribe('interests', () => {
      this.myinterests = [];
      this.myinterests = this.requestservice.myinterests; 
    })
  }

}
