import { initializeApp } from "firebase/app";
import { Database, getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkBdghY2Qb4wnU_OOnKx0ZPBqfaHw6m4Y",
  authDomain: "r8ider-3a49f.firebaseapp.com",
  databaseURL: "https://r8ider-3a49f-default-rtdb.firebaseio.com",
  projectId: "r8ider-3a49f",
  storageBucket: "r8ider-3a49f.firebasestorage.app",
  messagingSenderId: "774701742975",
  appId: "1:774701742975:web:ec37779ac937121c8a384a",
  measurementId: "G-H5FP3PG5FV"
};


const app = initializeApp(firebaseConfig);
export const database: Database = getDatabase(app);
