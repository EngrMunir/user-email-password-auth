// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA90kMHkLd42ApZKPNHLPLvC5GbIz9NVD8",
  authDomain: "user-email-password-auth-8786d.firebaseapp.com",
  projectId: "user-email-password-auth-8786d",
  storageBucket: "user-email-password-auth-8786d.appspot.com",
  messagingSenderId: "1012967355442",
  appId: "1:1012967355442:web:8f0b51e47330677c42782b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;