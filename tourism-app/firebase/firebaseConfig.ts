// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjxaq0hs92kIlIkyepOjak_4LglAA0Wts",
  authDomain: "tourism-8c11f.firebaseapp.com",
  projectId: "tourism-8c11f",
  storageBucket: "tourism-8c11f.appspot.com",
  messagingSenderId: "913382654171",
  appId: "1:913382654171:web:8abd73db31ef5f7d100cfe",
  measurementId: "G-QJ153ZEWBB",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export const db = getFirestore(app);

export { auth };
