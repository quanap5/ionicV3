import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { RequestsProvider } from '../../providers/requests/requests';

/**
 * Generated class for the NewUsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-users',
  templateUrl: 'new-users.html',
})
export class NewUsersPage {

  mynews: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public events: Events, public requestservice: RequestsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyInterestUsersPage');
  }

  ionViewWillEnter() {
    
    this.requestservice.getnews();

    this.events.subscribe('news', () => {
      this.mynews = [];
      this.mynews = this.requestservice.mynews; 
    })
  }
}
