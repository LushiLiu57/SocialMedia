// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzGcXC1VddBinooCUFrkOBdCDJizIEgzg",
  authDomain: "social-media-app-ae7ca.firebaseapp.com",
  projectId: "social-media-app-ae7ca",
  storageBucket: "social-media-app-ae7ca.appspot.com",
  messagingSenderId: "348524644766",
  appId: "1:348524644766:web:edcba2915baea255c26e8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)