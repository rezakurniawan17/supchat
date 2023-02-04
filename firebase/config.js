// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNnLaiSBw3-pCBY8SgVLmmQp7RplxfqnI",
  authDomain: "supchat-64b5c.firebaseapp.com",
  projectId: "supchat-64b5c",
  storageBucket: "supchat-64b5c.appspot.com",
  messagingSenderId: "1091940404828",
  appId: "1:1091940404828:web:50ef3a1db1533c04c1a099",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
