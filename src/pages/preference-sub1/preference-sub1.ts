import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { Profile } from "../../models/profile";
import  { Preference } from "../../models/preference";

/**
 * Generated class for the PreferenceSub1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-preference-sub1',
  templateUrl: 'preference-sub1.html',
})
export class PreferenceSub1Page {
  data2: Preference;

  height: number[] = new Array(20);
  min_height: number;
  selectedmax_Height: number [] =new Array;
  max_height: number;

  weight: number[] = new Array(20);
  min_weight: number;
  selectedmax_Weight: number [] =new Array;
  max_weight: number;

  structure: any = {lower: 1, upper: 1};


  constructor(public navCtrl: NavController, private navParams: NavParams, private view: ViewController,
  	) {
  	this.data2=navParams.get('data2')

  	for (var i = 0; i < 30; ++i) {
  		// code...
  		this.height[i]=150+i;
  		this.selectedmax_Height.push(this.height[i]);
  		this.weight[i]=40+i*2;
  		this.selectedmax_Weight.push(this.weight[i]);
  	}
  }

  ionViewWillLoad() {
  	this.data2= this.navParams.get('data2')
    console.log(this.data2);
  }



  closeModal(){
  	const data = {
  		name: 'John',
  		occupation: 'teacher'
  	};

  	this.view.dismiss(this.data2);

  }


  setmax_height(min: number){
  	this.selectedmax_Height = new Array();
  	for (var i = 0; i < this.height.length; ++i) {
  		// code...
  		if (this.height[i]>= min){
  			this.selectedmax_Height.push(this.height[i]);
  		}
  	}
  }


  setmax_weight(min: number){
  	this.selectedmax_Weight = new Array();
  	for (var i = 0; i < this.weight.length; ++i) {
  		// code...
  		if (this.weight[i]>= min){
  			this.selectedmax_Weight.push(this.weight[i]);
  		}
  	}
  }

}
