import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, Modal } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database-deprecated'
import { Observable } from 'rxjs/Observable'
import { Profile } from "../../models/profile";
import * as _ from 'lodash';
import 'rxjs/add/operator/filter'
import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage, initializeApp} from 'firebase';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { PreferencePage } from "../../pages/preference/preference"





/**
 * Generated class for the MyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my',
  templateUrl: 'my.html',
})
export class MyPage {
	public myProfile: AngularFireObject<Profile>
	
  public myProfile_: Observable<Profile>;
  public a: Profile;

  public gender: any;
  private uid: string;
  imgSourceAvar = 'assets/imgs/avatar-ben.png';
  imgSourceImg = "assets/imgs/unknown.png";
//  vidu slide image
  images = ['1', '2', '3', '4'];


  constructor(private camera: Camera, private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase,  private toast: ToastController, 
    private  modal: ModalController,
  	public navCtrl: NavController, public navParams: NavParams) {

    //this.a = navParams.get('currentProfile');

    console.log(this.a);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPage');
    this.afAuth.authState.subscribe(data => {
    	if (data && data.email && data.uid) { 
    		this.toast.create({
    		message: `Welcome to APP_Name, ${data.email} and ${data.uid}`,
    		duration: 3000
    	}).present();
        this.uid=data.uid;


    		this.myProfile = this.afDatabase.object(`profile/${data.uid}`)
      //   const cours$= this.afDatabase.object(`profile/${data.uid}`);
    		// cours$.subcrible(console.log());
    		this.myProfile_ = this.myProfile.valueChanges();
        //this.a =this.myProfile;


        //console.log(this.myProfile_);

        this.getMyURL();
       //console.log(this.myProfile_);
        

        

    	} else {
    		this.toast.create({
    		message: `Could not LOGIN wrong email or password`,
    		duration: 3000
    	}).present();
    	}
    
    });
  }

  // ionViewWillLoad(){
  //    this.getMyURL();
  // }


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
const pictures = storage().ref('picture/'+this.uid+'/avatar.png');
pictures.putString(image, 'data_url')
this.getMyURL();
}
catch (e){
  console.error(e);
}
}

getMyURL(){
    storage().ref().child('picture/'+this.uid+'/avatar.png').getDownloadURL().then((url)=>{
        this.imgSourceAvar = url;
        })
}




  async upload_Image(index: string){
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
const pictures = storage().ref('picture/'+this.uid+'/'+ index + '.png');
pictures.putString(image, 'data_url')
this.getMyURLImage(index);
}
catch (e){
  console.error(e);
}
}



getMyURLImage(index: string){
    storage().ref().child('picture/'+this.uid+'/'+ index +'.png').getDownloadURL().then((url)=>{
        this.imgSourceImg = url;
        console.log(this.imgSourceImg)
        })

    //this.imgSourceImg="'gs://fir-auth-d753b.appspot.com/picture/'+this.uid+'/'";
}


prefer_Setting(){
  //this.navCtrl.push(PreferencePage, {data1: this.myProfile_});
  const myModal = this.modal.create('PreferencePage', {data1: this.myProfile_});
  myModal.present();
  myModal.onDidDismiss((data)=>{
    console.log(data)
    
  })

}

edit_Profile(){
  this.navCtrl.push('ProfileEditPage',{current_profile: this.myProfile_ });
}



}
