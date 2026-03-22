import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sign-in-a5fee.firebaseapp.com",
  projectId: "sign-in-a5fee",
  storageBucket: "sign-in-a5fee.firebasestorage.app",
  messagingSenderId: "927003930626",
  appId: "1:927003930626:web:40bb207b51fd10dee7771b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);