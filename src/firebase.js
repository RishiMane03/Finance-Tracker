// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDICsE1ZCrFWMeca3i6eRAUyGhyxHfFwwE",
  authDomain: "finance-tracker-78e68.firebaseapp.com",
  projectId: "finance-tracker-78e68",
  storageBucket: "finance-tracker-78e68.appspot.com",
  messagingSenderId: "297088642601",
  appId: "1:297088642601:web:a8a63bcd172a4b77893638",
  measurementId: "G-7X3865BGFQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const db = getFirestore(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {db,auth,firestore ,provider,doc,setDoc}