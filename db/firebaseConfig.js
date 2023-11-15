/* firebaseConfig.js */
import admin from 'firebase-admin';


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseURL,
});

export default admin;