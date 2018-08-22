import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { connreq } from '../../models/request';
import { UserProvider } from '../user/user';
import firebase from 'firebase';


/*
  Generated class for the RequestsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RequestsProvider {

  firereq = firebase.database().ref('/requests'); //Database of request
  firefriends = firebase.database().ref('/friends'); //Database of friends
  fireinterest = firebase.database().ref('/interests'); //Database of tracking user interested in other
  firelikes = firebase.database().ref('/likes'); //Database of tracking user like other user
  firenews = firebase.database().ref('/news'); //Database of tracking user like other user
  

  
  userdetails;
  myfriends;
  myinterests: any[];
  mylikes: any[];
  mynews: any[];
  constructor(public userservice: UserProvider, public events: Events) {
    
  }

  sendrequest(req: connreq) {
    var promise = new Promise((resolve, reject) => {
      this.firereq.child(req.recipient).push().set({
      sender: req.sender
      }).then(() => {
        resolve({ success: true });
        }).catch((err) => {
          resolve(err);
    })
    })
    return promise;  
  }

  getmyrequests() {
    let allmyrequests;
    var myrequests = [];
    this.firereq.child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
      allmyrequests = snapshot.val();
      myrequests = [];
      for (var i in allmyrequests) {
        myrequests.push(allmyrequests[i].sender);
      }
      this.userservice.getallusers().then((res) => {
        var allusers = res[0]; //resolve now are 2 array quan index 0
        this.userdetails = [];
        for (var j in myrequests)
          for (var key in allusers) {
            if (myrequests[j] === allusers[key].uid) {
              this.userdetails.push(allusers[key]);
            }
          }
        this.events.publish('gotrequests');
      })

  })
  }  


  /**
   * this is response function when user accept the request from another
   * input: user requesting
   * output: creat database using provider
   * called from Chats page
   */

  acceptrequest(buddy) {
    var promise = new Promise((resolve, reject) => {
      this.myfriends = [];
      this.firefriends.child(firebase.auth().currentUser.uid).push().set({
        uid: buddy.uid
      }).then(() => {
        this.firefriends.child(buddy.uid).push().set({
          uid: firebase.auth().currentUser.uid
        }).then(() => {
          this.deleterequest(buddy).then(() => {
          resolve(true);
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
   * this is for tracking interested user 
   * input: user who be clicked
   * output: creat database using provider
   * called from Home page
   */
  trackingView(buddyuid) {
    var promise = new Promise((resolve, reject) => {
      this.fireinterest.child(buddyuid).push().set({
      viewer: firebase.auth().currentUser.uid
      }).then(() => {
        resolve({ success: true });
        }).catch((err) => {
          resolve(err);
    })
    })
    return promise;  
  }


  /**
   * this is for tracking user who liked current user
   * input: user who be clicked Like button
   * output: creat database using provider
   * called from profileBuddy
   */
  trackingLike(buddyuid) {
    var promise = new Promise((resolve, reject) => {
      this.firelikes.child(buddyuid).push().set({
      viewer: firebase.auth().currentUser.uid
      }).then(() => {
        resolve({ success: true });
        }).catch((err) => {
          resolve(err);
    })
    })
    return promise;  
  }

  

  deleterequest(buddy) {
    var promise = new Promise((resolve, reject) => {
     this.firereq.child(firebase.auth().currentUser.uid).orderByChild('sender').equalTo(buddy.uid).once('value', (snapshot) => {
          let somekey;
          for (var key in snapshot.val())
            somekey = key;
          this.firereq.child(firebase.auth().currentUser.uid).child(somekey).remove().then(() => {
            resolve(true);
          })
         })
          .then(() => {
          
        }).catch((err) => {
          reject(err);
        })
    })
    return promise; 
  }

  getmyfriends() {
    let friendsuid = [];
    this.firefriends.child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
      let allfriends = snapshot.val();
      this.myfriends = [];
      for (var i in allfriends)
        friendsuid.push(allfriends[i].uid);
        
      this.userservice.getallusers().then((users_) => {
        this.myfriends = [];
        let users =users_[0];
        for (var j in friendsuid)
          for (var key in users) {
            if (friendsuid[j] === users[key].uid) {
              this.myfriends.push(users[key]);
            }
          }
        this.events.publish('friends');
      }).catch((err) => {
        alert(err);
      })
    
    })
  }  



   /*
 
 For get information of user interseting me
 Called from - myInterestedUser
 Inputs - none
 Outputs - Promise.
 
 */

getmyinterest() {
  let interestsuid = [];
  this.fireinterest.child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
    let allinterests = snapshot.val();
    //this.myinterests = [];
    //push all id of 
    for (var i in allinterests)
      interestsuid.push(allinterests[i].viewer);
      
    this.userservice.getallusers().then((users_) => {
      this.myinterests = [];
      let users =users_[0];
      for (var j in interestsuid)
        for (var key in users) {
          if (interestsuid[j] === users[key].uid) {
            this.myinterests.push(users[key]);
          }
        }
     this.events.publish('interests');

    }).catch((err) => {
      alert(err);
    })
  
  })
}  


getmylikes() {
  let likesuid = [];
  this.firelikes.child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
    let alllikes = snapshot.val();
    //this.myinterests = [];
    //push all id of 
    for (var i in alllikes)
      likesuid.push(alllikes[i].viewer);
      
    this.userservice.getallusers().then((users_) => {
      this.mylikes = [];
      let users =users_[0];
      for (var j in likesuid)
        for (var key in users) {
          if (likesuid[j] === users[key].uid) {
            this.mylikes.push(users[key]);
          }
        }
     this.events.publish('likes');

    }).catch((err) => {
      alert(err);
    })
  
  })
}  


getnews() {
  let newsuid = [];
  this.firenews.on('value', (snapshot) => {
    let allnews = snapshot.val();
    //this.myinterests = [];
    //push all id of 
    for (var i in allnews)
    newsuid.push(allnews[i].viewer);
      
    this.userservice.getallusers().then((users_) => {
      this.mynews = [];
      let users =users_[0];
      for (var j in newsuid)
        for (var key in users) {
          if (newsuid[j] === users[key].uid) {
            this.mynews.push(users[key]);
          }
        }
     this.events.publish('news');

    }).catch((err) => {
      alert(err);
    })
  
  })
}  



}
