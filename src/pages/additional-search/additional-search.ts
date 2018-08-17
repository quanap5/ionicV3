import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Button } from 'ionic-angular';

/**
 * Generated class for the AdditionalSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-additional-search',
  templateUrl: 'additional-search.html',
})
export class AdditionalSearchPage {

  public buttonColor1: string = "dimgray";
  public buttonColor2: string = "dimgray";
  public buttonColor3: string = "dimgray";
  public buttonColor4: string = "dimgray";
  public buttonColor5: string = "dimgray";
  public buttonColor6: string = "dimgray";




  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdditionalSearchPage');
  }


  btnActivate(id: string) {

    if (id == "1") {
      if (this.buttonColor1 === 'dimgray')
        this.buttonColor1 = ' deeppink';
      else
        this.buttonColor1 = 'dimgray';

    }

    else if (id == "2") {
      if (this.buttonColor2 === 'dimgray')
        this.buttonColor2 = ' deeppink';
      else
        this.buttonColor2 = 'dimgray';

    }

    else if (id == "3") {
      if (this.buttonColor3 === 'dimgray')
        this.buttonColor3 = ' deeppink';
      else
        this.buttonColor3 = 'dimgray';

    }

    else if (id == "4") {
      if (this.buttonColor4 === 'dimgray')
        this.buttonColor4 = ' deeppink';
      else
        this.buttonColor4 = 'dimgray';

    }
    else if (id == "5") {
      if (this.buttonColor5 === 'dimgray')
        this.buttonColor5 = ' deeppink';
      else
        this.buttonColor5 = 'dimgray';

    }
    else if (id == "6") {
      if (this.buttonColor6 === 'dimgray')
        this.buttonColor6 = ' deeppink';
      else
        this.buttonColor6 = 'dimgray';

    }
  }

  reset() {
    this.buttonColor1 = 'dimgray';
    this.buttonColor2 = 'dimgray';
    this.buttonColor3 = 'dimgray';
    this.buttonColor4 = 'dimgray';
    this.buttonColor5 = 'dimgray';
    this.buttonColor6 = 'dimgray';


  }


}
