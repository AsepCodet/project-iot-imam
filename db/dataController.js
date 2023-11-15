/* datController.js */
import admin from './firebaseConfig.js';

function getStreamData(path, res) {
    return new Promise((resolve, reject) => {
        const db = admin.database();
        const ref = db.ref(path);
    
        ref.on('value', (snapshot) => {
          const data = snapshot.val();
          resolve(data);
        }, (error) => {
          reject(error);
        });
      });
}

export { getStreamData };