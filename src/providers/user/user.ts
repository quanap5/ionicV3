import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { Profile } from "../../models/profile";


/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  firedata = firebase.database().ref('/users');
  fireprofiles = firebase.database().ref('/profile');
  //fireprefers = firebase.database().ref('/prefer');

  constructor(public afireauth: AngularFireAuth) {
    console.log('Hello UserProvider Provider');
  }

  /*
Adds a new user to the system.
Called from - signup.ts
Inputs - The new user object containing the email, password and displayName.
Outputs - Promise.
 
 */

  adduser(newuser) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.createUserWithEmailAndPassword(newuser.email + '@' + newuser.type, newuser.password).then(() => {
        this.afireauth.auth.currentUser.updateProfile({
          displayName: newuser.email,
          photoURL: 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e'
        }).then(() => {
          this.firedata.child(this.afireauth.auth.currentUser.uid).set({
            uid: this.afireauth.auth.currentUser.uid,
            displayName: newuser.email,
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e',

          }).then(() => {
            resolve({ success: true });
          }).catch((err) => {
            reject(err);
          })
        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }


  /**
  Add new user with full of details of information
  Called from - profile.ts
  Inputs - the profile interface fill full by user and url of avatar, url of images
  Outputs - promise

   */

  addfulluser(profile: Profile, url: string) {
    profile.photoURL = url;
    var promise = new Promise((resolve, reject) => {

      this.firedata.child(this.afireauth.auth.currentUser.uid).set({
        uid: this.afireauth.auth.currentUser.uid,
        // target: profile.target,

        displayName: profile.username,
        // username: profile.username,
        // firstName: profile.firstName,
        // lastName: profile.lastName,

        // gender: profile.gender,
        // birth: profile.birth,        
        // age: profile.age,

        // education: profile.education,
        // city: profile.city,


        photoURL: profile.photoURL,
        // profileURL1: profile.profileURL1,
        // profileURL2: profile.profileURL2,
        // profileURL3: profile.profileURL2,
        // profileURL4: profile.profileURL2,
        profile: profile

      }).then(() => {
        resolve({ success: true });
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }


  /*
  For resetting the password of the user.
  Called from - passwordreset.ts
  Inputs - email of the user.
  Output - Promise.
  
   */

  passwordreset(email) {

    var promise = new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email).then(() => {
        resolve({ success: true });
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;

  }


  /*
 
 For updating the users collection and the firebase users list with
 the imageurl of the profile picture stored in firebase storage.
 Called from - profilepic.ts
 Inputs - Url of the image stored in firebase.
 OUtputs - Promise.
 
 */

  updateimage(imageurl) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.currentUser.updateProfile({
        displayName: this.afireauth.auth.currentUser.displayName,
        photoURL: imageurl
      }).then(() => {
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/profile').update({
          // displayName: this.afireauth.auth.currentUser.displayName,
          photoURL: imageurl,
          // profile: {photoURL: imageurl},
          // uid: firebase.auth().currentUser.uid
        }).then(() => {
          resolve({ success: true });
        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }



  /**
   * This is function to update image profile URL
   * Called from my.ts when click to take photo using camera
   * Input - url is designed for image profile
   * Output - url
   */


  updateimage1(imageurl, index) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.currentUser.updateProfile({
        displayName: this.afireauth.auth.currentUser.displayName,
        photoURL: this.afireauth.auth.currentUser.photoURL

      }).then(() => {
        if (index == '1') {

          firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/profile').update({
            // displayName: this.afireauth.auth.currentUser.displayName,
            profileURL1: imageurl
            // profile: {photoURL: imageurl},
            // uid: firebase.auth().currentUser.uid
          }).then(() => {
            resolve({ success: true });
          }).catch((err) => {
            reject(err);
          })

        } else if (index == '2') {

          firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/profile').update({
            // displayName: this.afireauth.auth.currentUser.displayName,
            profileURL2: imageurl
            // profile: {photoURL: imageurl},
            // uid: firebase.auth().currentUser.uid
          }).then(() => {
            resolve({ success: true });
          }).catch((err) => {
            reject(err);
          })
        }
        else if (index == '3') {
          firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/profile').update({
            // displayName: this.afireauth.auth.currentUser.displayName,
            profileURL3: imageurl
            // profile: {photoURL: imageurl},
            // uid: firebase.auth().currentUser.uid
          }).then(() => {
            resolve({ success: true });
          }).catch((err) => {
            reject(err);
          })

        } else {
          firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/profile').update({
            // displayName: this.afireauth.auth.currentUser.displayName,
            profileURL4: imageurl
            // profile: {photoURL: imageurl},
            // uid: firebase.auth().currentUser.uid
          }).then(() => {
            resolve({ success: true });
          }).catch((err) => {
            reject(err);
          })

        }

      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }


  /*
 
 For get information of user
 Called from - my.ts
 Inputs - none
 Outputs - Promise.
 
 */

  getMydetails() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
        resolve(snapshot.val());
        console.log("cai deo chi day: ",snapshot.val())
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }



  ///get buddy detail when you click on ion-card of use on home tab

  getbuddydetails(uid) {
    var promise = new Promise((resolve, reject) => {
      this.firedata.child(uid).once('value', (snapshot) => {
        resolve(snapshot.val());
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }



  updatedisplayname(newname) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.currentUser.updateProfile({
        displayName: newname,
        photoURL: this.afireauth.auth.currentUser.photoURL
      }).then(() => {
        this.firedata.child(firebase.auth().currentUser.uid).update({
          displayName: newname,
          photoURL: this.afireauth.auth.currentUser.photoURL,
          uid: this.afireauth.auth.currentUser.uid
        }).then(() => {
          resolve({ success: true });
        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  // Use for load all user on social network

  getallusers() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];
        let temparr2 = [];
        console.log("in ra userdata", userdata);
        //let t ={} as Profile;
        for (var key in userdata) {
          temparr.push(userdata[key]);
          //t = userdata[key].profile; 
          temparr2.push(userdata[key].profile);
         // console.log("in ra profile", userdata[key].profile);
         console.log("in ra userkey", userdata[key]);
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  // use for filter user using input search

  // Use for load all user on social network

  filterUsers(f1: string, f2: string) {
   
      var promise = new Promise((resolve, reject) => {
        this.firedata.orderByChild('uid').once('value', (snapshot) => {
          let userdata = snapshot.val();
          let temparr = [];

          console.log("in ra userdata", userdata);
          //let t ={} as Profile;
          for (var key in userdata) {

            if ( f1 == 'all' && f2 == 'all') {
              temparr.push(userdata[key]);
              
            } 
            else if (f1 == 'all') {
              if (userdata[key].profile.city.name == f2) {
                temparr.push(userdata[key]);
              } 
              
              
            }

            else if (f2 == 'all') {
              if (userdata[key].profile.target == f1) {
                temparr.push(userdata[key]);
              } 
              
              
            }
            
            else
            {
              if (userdata[key].profile.target == f1 && userdata[key].profile.city.name == f2) {
                  temparr.push(userdata[key]);
                } 
                
            }

          }
          resolve(temparr);
        }).catch((err) => {
          reject(err);
        })
      })

    return promise;
  }


  //read all profile

  getallprofiles(uid: string) {
    // var myprofile: Profile;
    // this.fireprofiles.child(uid).on('value', (snapshot) => {
    // myprofile = snapshot.val();

    // })
    // return myprofile;


    var promise = new Promise((resolve, reject) => {
      this.fireprofiles.child(uid).on('value', (snapshot) => {
        let myallprofile = snapshot.val();
        let temparr = [];
        for (var key in myallprofile) {
          temparr.push(myallprofile[key]);
        }
        resolve(temparr);
      })
    })
    return promise;

  }


  birth2zodiac(birth: string): string {

    // this code use to covert date to Zodiac for each user
    let tempt: number;
    let zodiac: string;
    tempt = parseInt((birth.substr(5, 2).concat(birth.substr(8, 2))));
    if (120 <= tempt && tempt <= 218) {

      zodiac = './assets/imgs/horoscope/aquarius-zodiac-sign-symbol256.png';

    } else if (219 <= tempt && tempt <= 320) {

      zodiac = './assets/imgs/horoscope/pisces-zodiac-sign256.png';

    } else if (321 <= tempt && tempt <= 419) {

      zodiac = './assets/imgs/horoscope/aries-bull-head-front-shape-symbol256.png';

    } else if (420 <= tempt && tempt <= 520) {

      zodiac = './assets/imgs/horoscope/taurus-bull-head-symbol-for-zodiac256.png';

    } else if (521 <= tempt && tempt <= 620) {

      zodiac = './assets/imgs/horoscope/gemini-twins-symbol256.png';

    } else if (621 <= tempt && tempt <= 722) {

      zodiac = './assets/imgs/horoscope/cancer256.png';

    } else if (723 <= tempt && tempt <= 822) {

      zodiac = './assets/imgs/horoscope/leo-astrological-sign256.png';

    } else if (823 <= tempt && tempt <= 922) {

      zodiac = './assets/imgs/horoscope/virgo-woman-head-shape-symbol256.png';

    } else if (923 <= tempt && tempt <= 1022) {

      zodiac = './assets/imgs/horoscope/libra-balanced-scale-symbol256.png';

    } else if (1023 <= tempt && tempt <= 1121) {

      zodiac = './assets/imgs/horoscope/scorpion-shape256.png';

    } else if (1122 <= tempt && tempt <= 1221) {

      zodiac = './assets/imgs/horoscope/sagittarius-sign256.png';
    } else {

      zodiac = './assets/imgs/horoscope/capricorn-astrological-sign-of-head-black-silhouette-with-horns256.png';

    }

    return zodiac;
  }



}
