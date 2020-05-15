import * as firebase from 'firebase';

//const settings = {timestampsInSnapshots: true};

var firebaseConfig = {
    apiKey: "AIzaSyC07pgiKqFr1MjLp7k4S6k105B2XL--Mqw",
    authDomain: "database-table-f6fa2.firebaseapp.com",
    databaseURL: "https://database-table-f6fa2.firebaseio.com",
    projectId: "database-table-f6fa2",
    storageBucket: "database-table-f6fa2.appspot.com",
    messagingSenderId: "183565590763",
    appId: "1:183565590763:web:53fe90fb897f11e4d59eae",
    measurementId: "G-3JFQEJR1BP"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase;
