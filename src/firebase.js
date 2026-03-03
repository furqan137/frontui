// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDmxZGZ_BKuU5qFH9L21Vk7DsUmxBSZp_4",
  authDomain: "authenchain-75857.firebaseapp.com",
  projectId: "authenchain-75857",
  storageBucket: "authenchain-75857.appspot.com",
  messagingSenderId: "998167461802",
  appId: "1:998167461802:web:4e083fcd21c07ec90575d3",
  measurementId: "G-WN2C72KG3F"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Services
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
export default app;
