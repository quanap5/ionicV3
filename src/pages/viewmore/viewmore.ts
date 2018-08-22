import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player'
import { DomSanitizer } from '@angular/platform-browser';
import { MyPage } from '../my/my';
import { ComingsoonPage } from '../comingsoon/comingsoon';
import { StripeNativePage } from '../stripe-native/stripe-native';
import { ManageChargePage } from '../manage-charge/manage-charge';


/**
 * Generated class for the ViewmorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewmore',
  templateUrl: 'viewmore.html',
})
export class ViewmorePage {

  video_id: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  private youtube: YoutubeVideoPlayer,
  public sanitizer: DomSanitizer) {
    this.video_id = 'yKVLchqy-s0';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewmorePage');
  }

  
  
  updateVideoUrl(id: string) {
    // Appending an ID to a YouTube URL is safe.
    // Always make sure to construct SafeValue objects as
    // close as possible to the input data, so
    // that it's easier to check if the value is safe.
    let dangerousVideoUrl = "https://www.youtube.com/embed/" + this.video_id + "?rel=0&amp;showinfo=0";
    return this.sanitizer.bypassSecurityTrustResourceUrl(dangerousVideoUrl);
   // this.watch_on_youtube(this.video_id);
}

watch_on_youtube( video_id ) {
    this.youtube.openVideo( video_id );
}

openBasicInfoSetting(){
  this.navCtrl.push(MyPage);
}


openComingsoon(){
  this.navCtrl.push(ComingsoonPage);
}


openPaymentManagement(){
  //this.navCtrl.push(StripeNativePage)
  this.navCtrl.push(ManageChargePage)
}



}
