import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAGazC8FjJ80NuoIP9YesxKOn6Z5GWqrnQ",
  authDomain: "weero-dev.firebaseapp.com",
  projectId: "weero-dev",
  storageBucket: "weero-dev.appspot.com",
  messagingSenderId: "600414118734",
  appId: "1:600414118734:web:f5ed34b839077f3a25b41f",
  measurementId: "G-7J5QHT8LRW",
};

let Weero = firebase.initializeApp(firebaseConfig);
export let auth = Weero.auth();
export let storage = Weero.storage();
export let db = Weero.firestore();
export default Weero;
