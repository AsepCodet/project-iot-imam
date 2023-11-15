/* firebaseConfig.js */
import admin from 'firebase-admin';
import serviceAccount from "../sdk/project-imam-37660-0cf411cd0948-SDK.json" assert { type: 'json' };

const databaseURL = 'https://project-imam-37660-default-rtdb.asia-southeast1.firebasedatabase.app/'; // Replace with your Firebase database URL

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseURL,
});

export default admin;