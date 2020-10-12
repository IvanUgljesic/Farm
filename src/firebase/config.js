import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';
require('dotenv').config();

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "sheep-farm-35234.firebaseapp.com",
    databaseURL: "https://sheep-farm-35234.firebaseio.com",
    projectId: "sheep-farm-35234",
    storageBucket: "sheep-farm-35234.appspot.com",
    messagingSenderId: "748413422158",
    appId: "1:748413422158:web:b7f5ad82a7768d7920d11f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const projectStorage = firebase.storage();
  const projectFirestore = firebase.firestore();
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;
  
  

  export { projectStorage, projectFirestore, timestamp };
  export default firebase;

  