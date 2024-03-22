import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtcMcuCwo1RfAww9DJ5txmB_Q_5NB8yww",
  authDomain: "occupational-health-2bcb0.firebaseapp.com",
  projectId: "occupational-health-2bcb0",
  storageBucket: "occupational-health-2bcb0.appspot.com",
  messagingSenderId: "666221959216",
  appId: "1:666221959216:web:f909b8e1d6ad3058d7f5f5",
  measurementId: "G-GRHE1VWZD5",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
