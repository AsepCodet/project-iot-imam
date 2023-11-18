/* datController.js */
import admin from "./firebaseConfig.js";

function getStreamData(path, res) {
  return new Promise((resolve, reject) => {
    const db = admin.database();
    const ref = db.ref(path);

    ref.on(
      "value",
      (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function getDataLog(path, res) {
  return new Promise((resolve, reject) => {
    try {
      const db = admin.database();
      const ref = db.ref(path);

      ref.once(
        "value",
        (snapshot) => {
          const data = snapshot.val();
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    } catch (error) {
      console.error("Error getting data log:", error);
      reject(error);
    }
  });
}

async function pushData(path, data) {
  try {
    var timestamp = data["Timestamp"];
    var now = new Date().getTime() / 1000;

    console.log("Timestamp:", timestamp);
    console.log("Current time:", now);

    if (now - timestamp <= 360) {
      console.log("Timestamp condition met. Proceeding to push data...");

      const db = admin.database();
      const today = new Date();
      const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      const formattedDate = today.toLocaleDateString("id-ID", options);
      const ref = db.ref(path + formattedDate);

      await ref.push(data);
      console.log("Data pushed to another path:", data);
    } else {
      console.log("Timestamp condition not met. Data not pushed.");
    }
  } catch (error) {
    console.error("Error pushing data to another path:", error);
  }
}

export { getStreamData, pushData, getDataLog };