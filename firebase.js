// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import * as firebase from "firebase"
import "firebase/auth";
import "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyA1bCtRHiKRu2VK-yZkW9J0vx-ViqgT_WU",
    authDomain: "signal-clone-82a7b.firebaseapp.com",
    projectId: "signal-clone-82a7b",
    storageBucket: "signal-clone-82a7b.appspot.com",
    messagingSenderId: "491812093791",
    appId: "1:491812093791:web:dbe2a3067c6561331140ea",
    measurementId: "G-6YDR05R5Y5"
  };

  let app;
  if( firebase.apps.length === 0) {
      app = firebase.initializeApp(firebaseConfig)
  }else {
      app = firebase.app()
  }
//   const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = app.firestore();
const auth = firebase.auth();

export { db, auth}