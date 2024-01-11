// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

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
export const auth = getAuth(app);

export const db = getFirestore(app);
