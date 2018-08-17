'use strict'

const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase);

//const stripe = require('stripe')(functions.config().stripe.testkey)
const stripe = require('stripe')('sk_test_YmXw3270KrL4ttk7w6RsSCSe');




exports.stripeCharge = functions.database.ref(`/payments/{userId}/{paymentId}`).onWrite((change, context) => {

    

    // const beforeData = change.before.val(); // data before the write
    // const afterData = change.after.val(); // data after the write


    const payment = change.after.val();
    const userId = context.params.userId;
    const paymentId = context.params.paymentId;


    // checks if payment exists or if it has already been charged19
    if (!payment || payment.charge) return;

    return admin.database()
        .ref(`/users/${userId}`)
        .once('value')
        .then(snapshot => {
            return snapshot.val();
        })
        .then(customer => {

            const amount = payment.amount;
            const idempotency_key = paymentId;  // prevent duplicate charges
            const source = payment.token.id;
            const currency = 'usd';
            const charge = { amount, currency, source };


           return stripe.charges.create(charge, { idempotency_key });
          // return {status: 'succeeded'}

        })

        .then(charge => {
            return admin.database()
                .ref(`/payments/${userId}/${paymentId}/charge`)
                .set(charge)
        })




});


//Test function

// exports.addMessage = functions.https.onRequest((req, res) => {
//     // Grab the text parameter.
//     const original = req.query.text;
//     // Push the new message into the Realtime Database using the Firebase Admin SDK.
//     return admin.database().ref('/messages').push({original: original}).then((snapshot) => {
//       // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
//       return res.redirect(303, snapshot.ref.toString());
//     });
//   });


// const nodemailer = require('nodemailer');
// // Configure the email transport using the default SMTP transport and a GMail account.
// // For Gmail, enable these:
// // 1. https://www.google.com/settings/security/lesssecureapps
// // 2. https://accounts.google.com/DisplayUnlockCaptcha
// // For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// // TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
// const gmailEmail = functions.config().gmail.email;
// const gmailPassword = functions.config().gmail.password;
// const mailTransport = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: gmailEmail,
//     pass: gmailPassword,
//   },
// });

// // Your company name to include in the emails
// // TODO: Change this to your app or company name to customize the email sent.
// const APP_NAME = 'Cloud Storage for Firebase quickstart';

// // [START sendWelcomeEmail]
// /**
//  * Sends a welcome email to new user.
//  */
// // [START onCreateTrigger]
// exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
// // [END onCreateTrigger]
//   // [START eventAttributes]
//   const email = user.email; // The email of the user.
//   const displayName = user.displayName; // The display name of the user.
//   // [END eventAttributes]

//   return sendWelcomeEmail('quanap5@gmail.com', 'Quan Long');
// });
// // [END sendWelcomeEmail]

// // [START sendByeEmail]
// /**
//  * Send an account deleted email confirmation to users who delete their accounts.
//  */
// // [START onDeleteTrigger]
// exports.sendByeEmail = functions.auth.user().onDelete((user) => {
// // [END onDeleteTrigger]
//   const email = user.email;
//   const displayName = user.displayName;

//   return sendGoodbyeEmail(email, displayName);
// });
// // [END sendByeEmail]

// // Sends a welcome email to the given user.
// function sendWelcomeEmail(email, displayName) {
//   const mailOptions = {
//     from: `${APP_NAME} <noreply@firebase.com>`,
//     to: email,
//   };

//   // The user subscribed to the newsletter.
//   mailOptions.subject = `Welcome to ${APP_NAME}!`;
//   mailOptions.text = `Hey ${displayName || ''}! Welcome to ${APP_NAME}. I hope you will enjoy our service.`;
//   return mailTransport.sendMail(mailOptions).then(() => {
//     return console.log('New welcome email sent to:', email);
//   });
// }

// // Sends a goodbye email to the given user.
// function sendGoodbyeEmail(email, displayName) {
//   const mailOptions = {
//     from: `${APP_NAME} <noreply@firebase.com>`,
//     to: email,
//   };

//   // The user unsubscribed to the newsletter.
//   mailOptions.subject = `Bye!`;
//   mailOptions.text = `Hey ${displayName || ''}!, We confirm that we have deleted your ${APP_NAME} account.`;
//   return mailTransport.sendMail(mailOptions).then(() => {
//     return console.log('Account deletion confirmation email sent to:', email);
//   });
// }
