import firebase from "firebase/compat/app";
import "firebase/compat/auth";
const config = {
  apiKey: "AIzaSyClMtCWG8vy55keNcCrXqe3Vf1Y-RAGdZk",
  authDomain: "xjob-b09d4.firebaseapp.com",
  projectId: "xjob-b09d4",
  storageBucket: "xjob-b09d4.appspot.com",
  messagingSenderId: "1041310125982",
  appId: "1:1041310125982:web:5abf4f329b20abc373908f",
  measurementId: "G-8BPN5JVWKJ",
  // ...
};
firebase.initializeApp(config);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => {
  return auth.signInWithPopup(provider);
};

export default firebase;
