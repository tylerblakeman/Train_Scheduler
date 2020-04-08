var firebaseConfig = {
    apiKey: "AIzaSyC6SQNHBATC0j3sjPBeHQaOiWYnNfI9gFU",
    authDomain: "trainscheduler-3934e.firebaseapp.com",
    databaseURL: "https://trainscheduler-3934e.firebaseio.com",
    projectId: "trainscheduler-3934e",
    storageBucket: "trainscheduler-3934e.appspot.com"
}

firebase.initializeApp(firebaseConfig);
firebase.analytics();


//      
var database = firebase.database();



var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");

