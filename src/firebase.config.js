// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcIuFUW00NXN0WuoZxz_sDbdM4CuuJxbw",
  authDomain: "openinapp-b99e0.firebaseapp.com",
  projectId: "openinapp-b99e0",
  storageBucket: "openinapp-b99e0.appspot.com",
  messagingSenderId: "349332648519",
  appId: "1:349332648519:web:8af6c1c047ea8ba75bf762",
  measurementId: "G-630L37VKQV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)