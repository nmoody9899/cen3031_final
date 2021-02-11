import firebase from 'firebase/app';
import 'firebase/auth';

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBxoD-HNxLTOn_KTLdPS9n8zvfM8yDIS6M",
    authDomain: "ecommerce-6a283.firebaseapp.com",
    projectId: "ecommerce-6a283",
    storageBucket: "ecommerce-6a283.appspot.com",
    messagingSenderId: "784596445231",
    appId: "1:784596445231:web:2c33f8502c8fb926bcbeda",
    measurementId: "G-0LQ1S2JN9M"
  };
  // Initialize Firebase
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
    //firebase.analytics();
  }
  
  //export
  // User Accounts for ecommerce FireBase:
  // application.devadm@gmail.com RS2pgU7J8U3QYFH
  // application.devuser1@gmail.com RS2pgU7J8U3QYFJ
  //export default firebase: for use in Login and Registration of Users
  export const auth = firebase.auth();
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
