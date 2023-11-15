/* firebaseConfig.js */
import admin from 'firebase-admin';

// Check if the environment variables are defined
if (!process.env.FIREBASE_SECRETSERVICE) {
  console.error('Firebase service account JSON is not defined. Exiting...');
  process.exit(1);
}

if (!process.env.DATABASE_URL) {
  console.error('Database URL is not defined. Exiting...');
  process.exit(1);
}

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(Buffer.from(process.env.FIREBASE_SECRETSERVICE, 'base64').toString('utf-8'))),
  databaseURL: process.env.DATABASE_URL,
});

export default admin;