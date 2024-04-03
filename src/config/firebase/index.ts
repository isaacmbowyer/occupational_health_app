import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBL5Nzpjb1OQehStjlGenJ9IGwgrmb_wLE",
  authDomain: "occupational-health-30432.firebaseapp.com",
  projectId: "occupational-health-30432",
  storageBucket: "occupational-health-30432.appspot.com",
  messagingSenderId: "906307519193",
  appId: "1:906307519193:web:ba792ddc811271acf2f4c8",
  measurementId: "G-YC2B1ZS73J",
};

initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();
