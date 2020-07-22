importScripts("https://www.gstatic.com/firebasejs/7.14.4/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.14.4/firebase-messaging.js"
);
firebase.initializeApp({
  messagingSenderId: "583481012996",
  apiKey: "AIzaSyCYdeM5ctuziOAL9tRINSJa7kzBn8bzvR0",
  authDomain: "cimssafe.firebaseapp.com",
  databaseURL: "https://cimssafe.firebaseio.com",
  projectId: "cimssafe",
  storageBucket: "cimssafe.appspot.com",
  appId: "1:583481012996:web:1fcabb85195e1499acd651",
  measurementId: "G-64SYCMCYGL"
});
const messaging = firebase.messaging();
