import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';

import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { UserProvider } from '../../providers/user/user';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the ProfilepicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profilepic',
  templateUrl: 'profilepic.html',
})
export class ProfilepicPage {

  imgurl = 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e';
  moveon: boolean = true;
  public user: any;


  constructor(private camera: Camera, public navCtrl: NavController, public navParams: NavParams,
  	public imgservice: ImghandlerProvider, public zone: NgZone, public userservice: UserProvider, public loadingCtrl: LoadingController) {

  	this.user= navParams.get('init_user');
    console.log(this.user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilepicPage');
  }

/* 
  Choose image from system storage for avatar user using the cordova-file-chooser plugin
  This is execute when clicking on button in profilepic.html
*/
chooseimage() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    })
    loader.present();
    this.imgservice.uploadimage().then((uploadedurl: any) => {
      loader.dismiss();
      this.zone.run(() => {
        this.imgurl = uploadedurl;
        this.moveon = false;
      })
    })
  }

  /*
  This is function to update image for avatar
   */

  updateproceed() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    })
    loader.present();
    this.userservice.updateimage(this.imgurl).then((res: any) => {
      loader.dismiss();
      if (res.success) {
        //this.navCtrl.setRoot('TabsPage');
        this.navCtrl.setRoot(ProfilePage, {url: this.imgurl })
      }
      else {
        alert(res);
      }
    })
  }

  /*
  Skip load image for avatar the application will use default avatar look like annomnymous
   */

  proceed() {
    //this.navCtrl.setRoot('TabsPage');
    this.navCtrl.setRoot(ProfilePage, {url: this.imgurl })
  }

/*
Take a photo is second option for upload avatar insteading of use 9image from storage
 */

  async takephoto(){
  //define camera options
  try {
  const options: CameraOptions={
    quality: 100,
    targetHeight: 600,
    targetWidth: 600,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  }

const result = await this.camera.getPicture(options);
const image = `data:image/jpeg;base64,${result}`;
//const pictures = storage().ref('picture/'+this.uid+'/avatar.png');
//pictures.putString(image, 'data_url')
//this.getMyURL();
}
catch (e){
  console.error(e);
}
}


}
