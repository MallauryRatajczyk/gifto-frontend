// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA8DOfPj8m1_N6yHyjBFrzVnbg4ujPhUq8",
    authDomain: "gifto-541c4.firebaseapp.com",
    projectId: "gifto-541c4",
    storageBucket: "gifto-541c4.appspot.com",
    messagingSenderId: "142297382250",
    appId: "1:142297382250:web:4b9f8db22b0cec08967913"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);