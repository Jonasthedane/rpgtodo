import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUGUTetVjswl3xDuUOzn9a7aIRfepYATs",
  authDomain: "rpgtodo-69efe.firebaseapp.com",
  projectId: "rpgtodo-69efe",
  storageBucket: "rpgtodo-69efe.appspot.com",
  messagingSenderId: "1016322942144",
  appId: "1:1016322942144:web:fa7aa6b05e6d68c6323925",
  //databaseURL: "rpgtodo-69efe.appspot.com",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
