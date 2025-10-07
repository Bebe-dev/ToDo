import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "todo-745db.firebaseapp.com",
    projectId: "todo-745db",
    storageBucket: "todo-745db.firebasestorage.app",
    messagingSenderId: "854367748743",
    appId: "1:854367748743:web:b35d323f3ab9f4d3476e22",
    measurementId: "G-M6F1FF8D7F"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and Google Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);