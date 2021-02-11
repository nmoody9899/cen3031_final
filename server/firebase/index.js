
var admin = require("firebase-admin");

var serviceAccount = require("../config/fbServiceAccountKey.json");

//had to create database in firebase in order to get databaseURL
//(it is in test mode first and needs rules updated)
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ecommerce-6a283-default-rtdb.firebaseio.com"
});

module.exports = admin;