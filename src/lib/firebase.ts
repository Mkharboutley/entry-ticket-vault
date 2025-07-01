
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCadt-vaTGUImWNc01aqnV9WJcfaZwSQuk",
  authDomain: "khuda-draw.firebaseapp.com",
  projectId: "khuda-draw",
  storageBucket: "khuda-draw.firebasestorage.app",
  messagingSenderId: "799173371067",
  appId: "1:799173371067:web:ce53b6e9e611a01710759e",
  measurementId: "G-ZJE9QYY08T"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
