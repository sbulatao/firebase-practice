// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXj-X0o_VxEgGXNTDVDFT7l7eEQsmTlOc",
  authDomain: "fir-practice-dc426.firebaseapp.com",
  projectId: "fir-practice-dc426",
  storageBucket: "fir-practice-dc426.firebasestorage.app",
  messagingSenderId: "189337329322",
  appId: "1:189337329322:web:00425d2b170cc74adc3ad3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();