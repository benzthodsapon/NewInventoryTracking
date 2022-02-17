import firebase from "firebase/compat";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseconfig = {
    apiKey: "AIzaSyDkpLEy1OyLEJQGZb0KsOimbBKpRoTPSMU",
    authDomain: "inventorytracking-72060.firebaseapp.com",
    projectId: "inventorytracking-72060",
    storageBucket: "inventorytracking-72060.appspot.com",
    messagingSenderId: "761040957009",
    appId: "1:761040957009:web:d2e77112db782710c2d270",
    measurementId: "G-SGFCRQTPQ6"
  };
const firebaseConfig = firebase.initializeApp(firebaseconfig)
firebase.firestore()
export const auth = firebase.auth()

export default firebaseConfig;

