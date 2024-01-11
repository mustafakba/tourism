// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeNXMVAb-TYKLO2SU40znH12nkUZZMkJk",
  authDomain: "tourism-app-6725f.firebaseapp.com",
  databaseURL: "https://tourism-app-6725f-default-rtdb.firebaseio.com",
  projectId: "tourism-app-6725f",
  storageBucket: "tourism-app-6725f.appspot.com",
  messagingSenderId: "40522964404",
  appId: "1:40522964404:web:b98740a12f62f4c116a6e1",
  measurementId: "G-FB859M72V3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
