/* firebaseConfig.js */
import admin from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.FIREBASE_SECRETSERVICE);
const databaseURL = process.env.DATABASE_URL

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseURL,
});

export default admin;