import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from "../../models/profile";

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  currentProfile: Profile;

  tab1: string = "ChatPage";
  tab2: string = "MyPage";
  tab3: string = "HomePage";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.currentProfile=this.navParams.get('my');
    console.log(this.currentProfile);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
