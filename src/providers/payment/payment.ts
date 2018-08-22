import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

/*
  Generated class for the PaymentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PaymentProvider {

  firepayments = firebase.database().ref('/payments'); // Database of transaction

  userId: string;

  constructor(public http: HttpClient, private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    console.log('Hello PaymentProvider Provider');
    this.afAuth.authState.subscribe((auth) => {
      if (auth) this.userId = auth.uid;
    })
  }


  // This will save the token to firebase, trigger the cloud function

  processPayment(token: any, amount) {
    const payment = { token, amount }
    return this.db.list(`/payments/${this.userId}`).push(payment);
  }


  /*
 
 For get transaction history
 Called from - ManageChargePage
 Inputs - none
 Outputs - Promise.
 
 */

  getmyTransaction() {
    var promise = new Promise((resolve, reject) => {
      this.firepayments.child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
        let allTransactions = snapshot.val();
        let tempTrans = [];
        for (var i in allTransactions) {
          tempTrans.push(allTransactions[i]);

        }
          
        resolve(tempTrans);
      })
    })
    return promise;



  }

}
