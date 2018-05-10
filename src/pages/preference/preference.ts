import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Modal, ViewController } from 'ionic-angular';
import { Profile } from "../../models/profile";
import { PreferenceSub1Page} from "../../pages/preference-sub1/preference-sub1";
import  { Preference } from "../../models/preference";

/**
 * Generated class for the PreferencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-preference',
  templateUrl: 'preference.html',
})
export class PreferencePage {
	items=[];
	data1: Preference;
	



  constructor(public navCtrl: NavController, public navParams: NavParams, private modal: ModalController,
  	private view: ViewController) {
  	this.data1= navParams.get('data1')

  	 this.items = [
      {
        'title': 'Look',
        'icon': 'aperture',
        'description': 'A powerful Javascript framework for building single page apps. Angular is open source, and maintained by Google.',
        'color': '#E63135'
      },
      {
        'title': 'Background',
        'icon': 'color-palette',
        'description': 'The latest version of cascading stylesheets - the styling language of the web!',
        'color': '#0CA9EA'
      },
      {
        'title': 'Availability',
        'icon': 'heart-outline',
        'description': 'The latest version of the web\'s markup language.',
        'color': '#F46529'
      },
      {
        'title': 'Personality',
        'icon': 'finger-print',
        'description': 'One of the most popular programming languages on the Web!',
        'color': '#FFD439'
      },
      {
        'title': 'Vices',
        'icon': 'no-smoking',
        'description': 'Syntactically Awesome Stylesheets - a mature, stable, and powerful professional grade CSS extension.',
        'color': '#CE6296'
      },
      {
        'title': 'Questionair',
        'icon': 'quote',
        'description': 'An open-source, cross-platform runtime environment for developing server-side Web applications.',
        'color': '#78BD43'
      },
      {
        'title': 'More',
        'icon': 'options',
        'description': 'A clear and powerful object-oriented programming language!',
        'color': '#3575AC'
      }
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreferencePage');
  }


  closeModal(){
  	const data = {
  		name: 'John John',
  		occupation: 'teacher teacher'
  	};

  	this.view.dismiss(this.data1);

  }

  openNavDetailsPage(item) {
    //this.navCtrl.push(NavigationDetailsPage, { item: item });
    // this.navCtrl.push(PreferenceSub1Page, {data2: this.myProfile_})

    const myData: Preference = {height: {min:0, max: 1}, weight: {min: 0, max: 1}};
     const myModal2 = this.modal.create(PreferenceSub1Page, {data2: myData});
 	 myModal2.present();
 	 myModal2.onDidDismiss((data)=>{
 	 	console.log(data);
 	 	this.data1= data;
 	 })
  }

}
