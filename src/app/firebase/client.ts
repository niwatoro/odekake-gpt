// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1Ugp3dBpQru5hIzvWuFfIA1Avv89nbhM",
  authDomain: "odekake-gpt.firebaseapp.com",
  projectId: "odekake-gpt",
  storageBucket: "odekake-gpt.appspot.com",
  messagingSenderId: "304388350453",
  appId: "1:304388350453:web:daeb63f5994e19a6be40bc",
  measurementId: "G-DE8J1Q99PD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
