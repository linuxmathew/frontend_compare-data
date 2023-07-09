// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvkesKNNjdc9MgzwWOtEIkhhSR9bKUiTQ",
  authDomain: "data-compare-auth.firebaseapp.com",
  projectId: "data-compare-auth",
  storageBucket: "data-compare-auth.appspot.com",
  messagingSenderId: "621090997575",
  appId: "1:621090997575:web:846ef0c2285635861eb862",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
