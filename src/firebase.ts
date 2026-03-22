// firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// (Optional) analytics
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCsUcc0gNcQrtc_PmmFArO_qKE0y6l_mY4",
  authDomain: "sign-in-a5fee.firebaseapp.com",
  projectId: "sign-in-a5fee",
  storageBucket: "sign-in-a5fee.firebasestorage.app",
  messagingSenderId: "927003930626",
  appId: "1:927003930626:web:40bb207b51fd10dee7771b",
  measurementId: "G-SDSB2V9GCF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ ADD THIS (MAIN FIX)
export const auth = getAuth(app);

// Optional
const analytics = getAnalytics(app);