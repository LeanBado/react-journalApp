// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore/lite"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDttj-jqAbFDw9Ql8pWbNP7DGKy1jCUvD8",
  authDomain: "react-curso-udemy-9d5ab.firebaseapp.com",
  projectId: "react-curso-udemy-9d5ab",
  storageBucket: "react-curso-udemy-9d5ab.appspot.com",
  messagingSenderId: "742901355374",
  appId: "1:742901355374:web:2e67285b53660394df277f"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB = getFirestore(FirebaseApp)