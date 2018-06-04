import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import firebase from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage, initializeApp } from 'firebase';


/*
  Generated class for the ImghandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImghandlerProvider {
  

  nativepath: any;
  firestore = firebase.storage();

  constructor(public filechooser: FileChooser, public camera: Camera) {
    console.log('Hello ImghandlerProvider Provider');
  }


 /*
 
 For uploading an image to firebase storage.

 Called from - profilepic.ts
 Inputs - None.
 Outputs - The image url of the stored image. 
  
  */
  uploadimage() {
    var promise = new Promise((resolve, reject) => {
        this.filechooser.open().then((url) => {
          (<any>window).FilePath.resolveNativePath(url, (result) => {
            this.nativepath = result;
            (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
              res.file((resFile) => {
                var reader = new FileReader();
                reader.readAsArrayBuffer(resFile);
                reader.onloadend = (evt: any) => {
                  var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
                  var imageStore = this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid + '/avatar.png');
                  imageStore.put(imgBlob).then((res) => {
                    this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid + '/avatar.png').getDownloadURL().then((url) => {
                      resolve(url);
                    }).catch((err) => {
                        reject(err);
                    })
                  }).catch((err) => {
                    reject(err);
                  })
                }
              })
            })
          })
      })
    })    
     return promise;   
  }


  picmsgstore() {
    var promise = new Promise((resolve, reject) => {
        this.filechooser.open().then((url) => {
          (<any>window).FilePath.resolveNativePath(url, (result) => {
            this.nativepath = result;
            (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
              res.file((resFile) => {
                var reader = new FileReader();
                reader.readAsArrayBuffer(resFile);
                reader.onloadend = (evt: any) => {
                  var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
                  var uuid = this.guid();
                  var imageStore = this.firestore.ref('/picmsgs').child(firebase.auth().currentUser.uid).child('picmsg' + uuid);
                  imageStore.put(imgBlob).then((res) => {
                      resolve(res.downloadURL);
                    }).catch((err) => {
                        reject(err);
                    })
                  .catch((err) => {
                    reject(err);
                  })
                }
              })
            })
          })
      })
    })    
     return promise;   
  }

  guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}




/*
Chuyen take photo vao provider
 */

 
async takephotoProvider() {
  //define camera options
  try {
    const options: CameraOptions = {
      quality: 50,
      targetHeight: 300,
      targetWidth: 300,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

    const result = await this.camera.getPicture(options);
    const image = `data:image/jpeg;base64,${result}`;

    const pictures = storage().ref('profileimages/' + firebase.auth().currentUser.uid + '/avatar.png');
    pictures.putString(image, 'data_url');


    // this.zone.run(() => {
    // this.getMyURL();  
    // this.loaduserdetails();   })


    // this.getMyURL();
    // this.loaduserdetails();
    // this.navCtrl.setRoot(TabsPage);


  }
  catch (e) {
    console.error(e);
  }
}

}
