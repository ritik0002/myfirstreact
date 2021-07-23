import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyArQbAb9sTV7Vffy1HIHshiSiDHcjIDHNw",
    authDomain: "todolist-e60e1.firebaseapp.com",
    projectId: "todolist-e60e1",
    storageBucket: "todolist-e60e1.appspot.com",
    messagingSenderId: "636219533017",
    appId: "1:636219533017:web:86092cf967f690e43980c8"
  };


 firebase.initializeApp (firebaseConfig);

 export default firebase;