// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUrdeCvwI8H_y9jmuGRdEEQFHBqFzCX6I",
  authDomain: "shoot-and-sell-auth.firebaseapp.com",
  projectId: "shoot-and-sell-auth",
  storageBucket: "shoot-and-sell-auth.firebasestorage.app",
  messagingSenderId: "632713751323",
  appId: "1:632713751323:web:059506e7994c0f34c701be",
  measurementId: "G-L2BQ0W33Y1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);

export default app;
