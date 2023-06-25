const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
require("dotenv").config();
// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const dataBase = admin.database();
const fireStoreDB = admin.firestore();

module.exports = {
  dataBase: dataBase,
  fireStoreDB: fireStoreDB,
};
